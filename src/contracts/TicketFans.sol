pragma solidity >=0.5.0;


contract TicketFan{
    string public name;
    uint public ticketCount = 0;
    mapping(uint => Ticket) public tickets;

    struct Ticket{
        uint id;
        string artist;
        uint price;
        address payable owner;
        bool purchased;
    }


event TicketCreated(uint id,
        string artist,
        uint price,
        address payable owner,
        bool purchased
        );

event TicketPurchased(uint id,
        string artist,
        uint price,
        address payable owner,
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

function purchaseTicket(uint _id) public payable{

Ticket memory _ticket = tickets[_id];//get ticket

address payable _seller = _ticket.owner;//get owner

require(_ticket.id >0 && _ticket.id <= ticketCount);//valid id

require(msg.value >= _ticket.price);

require(!_ticket.purchased);

require(_seller != msg.sender);

_ticket.owner = msg.sender;//give owner ship

_ticket.purchased = true; //confirm purchase

tickets[_id] = _ticket;//update ticket

address(_seller).transfer(msg.value);//[pay seller]

emit TicketPurchased (ticketCount,_ticket.artist,_ticket.price, msg.sender,true);


}


}