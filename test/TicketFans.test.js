const { assert } = require('chai')

const TicketFan = artifacts.require('/mnt/c/Users/leon_/.VScodeWorkspace/CMPE183TicketFans/src/contracts/TicketFans.sol')

require('chai')
.use(require ('chai-as-promised'))
.should()

contract ('TicketFan',([deployer,seller,buyer]) =>{
let ticketfans
before(async () => {
    ticketfans = await TicketFan.deployed()
})
describe ('deployment', async () => {
    it('deploys successfully', async () =>{
        const address  = await ticketfans.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })
    it('has a name', async () => {
        const name = await ticketfans.name()
        assert.equal(name, 'TicketFans')
      })
})

describe ('tickets', async () => {
    let result,ticketCount
    before(async () => {
        result = await ticketfans.createTicket('Kanye East',web3.utils.toWei('1','Ether'),1,1,1,{from:seller})
        ticketCount = await ticketfans.ticketCount()
    })

    it('creates ticket', async () => {
        assert.equal(ticketCount, 1)//works
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), ticketCount.toNumber(), 'id is correct')
        assert.equal(event.artist, 'Kanye East', 'name is correct')
        assert.equal(event.price, '1000000000000000000', 'price is correct')
        assert.equal(event.TicketNum, '1', 'Ticket Number is correct')
        assert.equal(event.SeatNum, '1', 'Seat Number is correct')
        assert.equal(event.SectionNum, '1', 'Section Number is correct')
        assert.equal(event.owner, seller, 'owner is correct')
        assert.equal(event.purchased, false, 'purchased is correct')
  
        // FAILURE: Product must have a price
        await await ticketfans.createTicket('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
        // FAILURE: Product must have a name
        await await ticketfans.createTicket('Kanye East', 0, { from: seller }).should.be.rejected;
        // FAILURE: Product must have a ticket number
        await await ticketfans.createTicket('', web3.utils.toWei('1', 'Ether'),0,1,1, { from: seller }).should.be.rejected;
        // FAILURE: Product must have a seat number
        await await ticketfans.createTicket('Kanye East', web3.utils.toWei('1', 'Ether'),1,0,1, { from: seller }).should.be.rejected;
         // FAILURE: Product must have a section number
        await await ticketfans.createTicket('Kanye East', web3.utils.toWei('1', 'Ether'), 1,1,0, { from: seller }).should.be.rejected;
      })

      it('lists tickets', async () => {

        const tick = await ticketfans.tickets(ticketCount)
        assert.equal(tick.id.toNumber(), ticketCount.toNumber(), 'id is correct')
        assert.equal(tick.artist, 'Kanye East', 'name is correct')
        assert.equal(tick.TicketNum, '1', 'Ticket number is correct')
        assert.equal(tick.SeatNum, '1', 'seat number is correct')
        assert.equal(tick.SectionNum, '1', 'section number is correct')
        assert.equal(tick.price, '1000000000000000000', 'price is correct')
        assert.equal(tick.owner, seller, 'owner is correct')
        assert.equal(tick.purchased, false, 'purchased is correct')
  

      })

      it('lists sells', async () => {
        let selleroldbal
        selleroldbal = await web3.eth.getBalance(seller)
        selleroldbal = new web3.utils.BN(selleroldbal)


        result = await ticketfans.purchaseTicket(ticketCount,{from:buyer, value:web3.utils.toWei('1', 'Ether')})

        //ensure transaction went through
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), ticketCount.toNumber(), 'id is correct')
        assert.equal(event.artist, 'Kanye East', 'name is correct')
        assert.equal(event.TicketNum, '1', 'Ticket Number is correct')
        assert.equal(event.SeatNum, '1', 'Seat Number is correct')
        assert.equal(event.SectionNum, '1', 'Section Number is correct')
        assert.equal(event.price, '1000000000000000000', 'price is correct')
        assert.equal(event.owner, buyer, 'owner is correct')
        assert.equal(event.purchased, true, 'purchased is correct')
  
        //make sure payment has been recieved
        let sellernewbal
        sellernewbal = await web3.eth.getBalance(seller)
        sellernewbal = new web3.utils.BN(sellernewbal)

        let price
        price = web3.utils.toWei('1','Ether')
        price  = new web3.utils.BN(price)

       const expectedbal = selleroldbal.add(price)

       assert.equal(sellernewbal.toString(),expectedbal.toString())

       await ticketfans.purchaseTicket(99,{from:buyer, value:web3.utils.toWei('1', 'Ether')}).should.be.rejected;//attempt to pruchase invalid ticket

       await ticketfans.purchaseTicket(ticketCount,{from:buyer, value:web3.utils.toWei('.5', 'Ether')}).should.be.rejected;//not enough funds

       await ticketfans.purchaseTicket(ticketCount,{from:deployer, value:web3.utils.toWei('1', 'Ether')}).should.be.rejected;//cannot be purchased twice

       await ticketfans.purchaseTicket(ticketCount,{from:buyer, value:web3.utils.toWei('1', 'Ether')}).should.be.rejected;// buyer cannot be seller
      })

})

})