// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ReuseLabel
 * @dev Smart contract for managing certification of products in the REUSE Platform
 */
contract ReuseLabel {
    struct Certificate {
        address issuer;
        address owner;
        string productId;
        uint256 issueDate;
        bool isValid;
    }
    
    mapping(string => Certificate) public certificates;
    
    event CertificateIssued(string productId, address issuer, address owner, uint256 issueDate);
    event CertificateTransferred(string productId, address previousOwner, address newOwner);
    event CertificateRevoked(string productId, address issuer);
    
    /**
     * @dev Issue a new certificate for a product
     * @param productId The unique identifier of the product
     * @param initialOwner The initial owner of the certificate
     */
    function issueCertificate(string memory productId, address initialOwner) public {
        require(bytes(productId).length > 0, "Product ID cannot be empty");
        require(certificates[productId].issueDate == 0, "Certificate already exists for this product");
        
        certificates[productId] = Certificate({
            issuer: msg.sender,
            owner: initialOwner,
            productId: productId,
            issueDate: block.timestamp,
            isValid: true
        });
        
        emit CertificateIssued(productId, msg.sender, initialOwner, block.timestamp);
    }
    
    /**
     * @dev Verify if a certificate is valid for a product
     * @param productId The unique identifier of the product
     * @return bool indicating whether the certificate is valid
     */
    function verifyCertificate(string memory productId) public view returns (bool) {
        return certificates[productId].isValid && certificates[productId].issueDate > 0;
    }
    
    /**
     * @dev Transfer ownership of a certificate to a new owner
     * @param productId The unique identifier of the product
     * @param newOwner The address of the new owner
     */
    function transferCertificate(string memory productId, address newOwner) public {
        require(certificates[productId].issueDate > 0, "Certificate does not exist");
        require(certificates[productId].isValid, "Certificate is not valid");
        require(certificates[productId].owner == msg.sender, "Only the owner can transfer the certificate");
        require(newOwner != address(0), "Cannot transfer to the zero address");
        
        address previousOwner = certificates[productId].owner;
        certificates[productId].owner = newOwner;
        
        emit CertificateTransferred(productId, previousOwner, newOwner);
    }
    
    /**
     * @dev Revoke a certificate, making it invalid
     * @param productId The unique identifier of the product
     */
    function revokeCertificate(string memory productId) public {
        require(certificates[productId].issueDate > 0, "Certificate does not exist");
        require(certificates[productId].issuer == msg.sender, "Only the issuer can revoke the certificate");
        
        certificates[productId].isValid = false;
        
        emit CertificateRevoked(productId, msg.sender);
    }
    
    /**
     * @dev Get certificate details for a product
     * @param productId The unique identifier of the product
     * @return Certificate struct containing certificate details
     */
    function getCertificate(string memory productId) public view returns (Certificate memory) {
        return certificates[productId];
    }
} 