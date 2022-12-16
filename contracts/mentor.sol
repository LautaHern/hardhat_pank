pragma solidity ^0.8.0;

contract Certify {
    // Dirección de la primera persona
    address public person1;

    // Dirección de la segunda persona
    address public person2;

    // Indica si la primera persona ha firmado el contrato
    bool public person1Signed;

    // Indica si la segunda persona ha firmado el contrato
    bool public person2Signed;

    // Indica si el certificado ha sido emitido
    string public certificateIssued;

    constructor() public {
        // Inicialmente, ninguna persona ha firmado el contrato y el certificado no ha sido emitido
        person1Signed = false;
        person2Signed = false;
        certificateIssued = "";
    }

    // Método que permite a la primera persona firmar el contrato
    function sign1(address _person1) public {
        // Verifica que la dirección pasada como parámetro sea la misma que la dirección de la primera persona
        require(_person1 == person1, "La dirección especificada no coincide con la dirección de la primera persona");

        // Establece la dirección de la primera persona y marca que ha firmado el contrato
        person1 = _person1;
        person1Signed = true;
    }

    // Método que permite a la segunda persona firmar el contrato
    function sign2(address _person2) public {
        // Verifica que la dirección pasada como parámetro sea la misma que la dirección de la segunda persona
        require(_person2 == person2, "La dirección especificada no coincide con la dirección de la segunda persona");

        // Establece la dirección de la segunda persona y marca que ha firmado el contrato
        person2 = _person2;
        person2Signed = true;
    }

    // Método que permite emitir el certificado una vez que ambas personas hayan firmado el contrato
    function issueCertificate() public {
        // Verifica que ambas personas hayan firmado el contrato
        require(person1Signed && person2Signed, "Ambas personas deben haber firmado el contrato antes de emitir el certificado");

        // Marca que el certificado ha sido emitido
        certificateIssued = "Este mensaje certifica que fulano ha aprobado el curso de programación y mentoría de programadores";
    }
}