//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract DrugDetection {
    address public owner;
    uint256 public DrugId = 0;

    struct Manufacturer {
        bool exists;
        string name;
        string website;
        address wallet_address;
    }

    struct DrugData {
        address curOwner;
        uint256 curTimestamp;
    }

    struct Drug {
        bool exists;
        uint256 id;
        string name;
        string model;
        uint256 price;
        address manufacturer;
        uint256 manufacturedTimestamp;
        address curOwner;
        DrugData[] owners;
    }

    mapping(address => Manufacturer) public manufacturers;
    mapping(uint256 => Drug) public Drugs;

    event ManufacturerCreated(string name, address _address);
    event DrugCreated(uint256 id, address manufacturer);
    event OwnershipUpdated(uint256 id, address newOwner);

    constructor() {
        owner = msg.sender;
    }

    function createManufacturer(
        string memory _name,
        string memory _website,
        address _address
    ) public {
        require(
            msg.sender == owner,
            "Only owner is authorised to create a manufacturer!"
        );

        Manufacturer storage m = manufacturers[_address];
        m.exists = true;
        m.name = _name;
        m.wallet_address = _address;
        m.website = _website;
        emit ManufacturerCreated(_name, _address);
    }

    function createDrug(
        string memory _name,
        string memory _model,
        uint256 _price
    ) public {
        require(
            manufacturers[msg.sender].exists == true,
            "You are not a Manufacturer!"
        );
        Drug storage p = Drugs[DrugId];
        p.exists = true;
        p.id = DrugId;
        p.name = _name;
        p.model = _model;
        p.price = _price;
        p.manufacturedTimestamp = block.timestamp;
        p.manufacturer = msg.sender;
        p.curOwner = msg.sender;
        DrugData memory data = DrugData(
            msg.sender,
            p.manufacturedTimestamp
        );
        p.owners.push(data);
        DrugId++;
        emit DrugCreated(DrugId - 1, msg.sender);
    }

    function getManufacture(address _address)
        public
        view
        returns (Manufacturer memory)
    {
        return manufacturers[_address];
    }

    function getDrug(uint256 _id) public view returns (Drug memory) {
        return Drugs[_id];
    }

    function updateOwnership(uint256 _id, address _newOwner) public {
        Drug storage p = Drugs[_id];
        require(p.curOwner == msg.sender, "Not authorized");
        p.curOwner = _newOwner;
        DrugData memory data = DrugData(_newOwner, block.timestamp);
        p.owners.push(data);

        emit OwnershipUpdated(_id, _newOwner);
    }
}
