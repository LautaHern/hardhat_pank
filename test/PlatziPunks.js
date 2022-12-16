const { expect } = require("chai");

describe("Mentority Contract", () => {
  const setup = async (maxSupply = 10000) => {
    const [owner] = await ethers.getSigners();
    const Mentor = await ethers.getContractFactory("mentor");

    const deployed = await Mentor.deploy(maxSupply);

    return {
      owner,
      deployed,
    };
  };

  describe("Deployment", () => {
    it("Set max supply to passed param", async () => {
      const maxSupply = 100;
      const { deployed } = await setup(maxSupply);

      const returnedMaxSupply = await deployed.maxSupply();
      expect(maxSupply).to.equal(returnedMaxSupply);
    });
  });

  describe("Minting", () => {
    it("Mints a new token and assigns it to owner", async () => {
      const { owner, deployed } = await setup();
      await deployed.mint();

      const ownerOffMinted = await deployed.ownerOf(0);

      expect(ownerOffMinted).to.equal(owner.address);
    });

    it("Has a minting limit", async () => {
      const maxSupply = 2;
      const { deployed } = await setup(maxSupply);

      // Mint all
      await deployed.mint();
      await deployed.mint();

      // Assert the last minting
      await expect(deployed.mint()).to.be.revertedWith("No quedan certificados");
    });
  });

  describe("tokenURI", () => {
    it("Returns valid metadata", async () => {
      const { deployed } = await setup();
      await deployed.mint();
      const tokenURI = await deployed.tokenURI(0);

      const stringifiedTokenURI = await tokenURI.toString();

      const base64JSON = stringifiedTokenURI
        .split("data:application/json;base64,")
        .join("");

      const stringifiedMetadata = await Buffer.from(
        base64JSON,
        "base64"
      ).toString("ascii");

      const metadata = JSON.parse(stringifiedMetadata);

      expect(metadata).to.have.keys("name", "description", "image");
    });
  });
});
