import React, { Component } from 'react';
import './main.css';

class Main extends Component {

  render() {
    return (
      <div class="ticketHeader" id="content">
        <h1 >Add Ticket</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.artistName.value
          const SerialNum = this.TicketNum.value
          const Rw = this.SeatNum.value
          const Section = this.SectionNum.value
          const price = window.web3.utils.toWei(this.ticketPrice.value.toString(), 'Ether')
          this.props.createTicket(name, price,SerialNum,Rw,Section)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="artistName"
              type="text"
              ref={(input) => { this.artistName = input }}
              className="form-control"
              placeholder="Artist Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="TicketNum"
              type="text"
              ref={(input) => { this.TicketNum = input }}
              className="form-control"
              placeholder="Ticket Number"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="SeatNum"
              type="text"
              ref={(input) => { this.SeatNum = input }}
              className="form-control"
              placeholder="Seat Number"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="SectionNum"
              type="text"
              ref={(input) => { this.SectionNum = input }}
              className="form-control"
              placeholder="Section Number"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="ticketPrice"
              type="text"
              ref={(input) => { this.ticketPrice = input }}
              className="form-control"
              placeholder="Ticket Price"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Ticket</button>
        </form>
        <p> </p>
        <h2>Buy Ticket</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Ticket Number</th>
              <th scope="col">Seat Number</th>
              <th scope="col">Section Number</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="ticketList">
          { this.props.tickets.map((ticket, key) => {
  return(
    <tr key={key}>
      <th scope="row">{ticket.id.toString()}</th>
      <td>{ticket.artist}</td>
      <td>{ticket.TicketNum.toString()}</td>
      <td>{ticket.SeatNum.toString()}</td>
      <td>{ticket.SectionNum.toString()}</td>
      <td>{window.web3.utils.fromWei(ticket.price.toString(), 'Ether')} Eth</td>
      <td>{ticket.owner}</td>
      <td>
        { !ticket.purchased
          ? <button
              name={ticket.id}
              value={ticket.price}
              onClick={(event) => {
                this.props.purchaseTicket(event.target.name, event.target.value)
              }}
            >
              Buy
            </button>
          : null
        }
        </td>
    </tr>
  )
})}
 </tbody>
        </table>
      </div>
    );
  }
}

export default Main;