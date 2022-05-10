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
        result = await ticketfans.createTicket('Kanye East',web3.utils.toWei('1','Ether'),{from:seller})
        ticketCount = await ticketfans.ticketCount()
    })

    it('creates ticket', async () => {
        assert.equal(ticketCount, 1)//works
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), ticketCount.toNumber(), 'id is correct')
        assert.equal(event.artist, 'Kanye East', 'name is correct')
        assert.equal(event.price, '1000000000000000000', 'price is correct')
        assert.equal(event.owner, seller, 'owner is correct')
        assert.equal(event.purchased, false, 'purchased is correct')
  
        // FAILURE: Product must have a price
        await await ticketfans.createTicket('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
        // FAILURE: Product must have a name
        await await ticketfans.createTicket('Kanye East', 0, { from: seller }).should.be.rejected;
      })
})

})