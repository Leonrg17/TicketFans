pragma solidity >=0.5.0;


contract TicketFan{
    string public name;
    uint public ticketCount = 0;
    mapping(uint => Ticket) public tickets;

    struct Ticket{
        uint id;
        string artist;
        uint price;
        address owner;
        bool purchased;
    }


event TicketCreated(uint id,
        string artist,
        uint price,
        address owner,
        bool purchased
        );


    constructor() public{
name  = "TicketFans";

    }

function createTicket(string memory _artist,uint _price) public{

require(bytes(_artist).length > 0);

require(_price>0);




ticketCount++;//intement ticket count

tickets[ticketCount] = Ticket(ticketCount,_artist,_price, msg.sender,false );//create ticket

emit TicketCreated (ticketCount,_artist,_price, msg.sender,false);


}


}