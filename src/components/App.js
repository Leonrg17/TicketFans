import React, { Component } from 'react';
import logo from '../logo.png';
import Navbar from './Navbar'
import './App.css';
import Web3 from 'web3'
import TicketFan from '../abis/TicketFan.json'
import Main from './Main'
class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }


  async loadBlockchainData() {
  const web3 = window.web3
    //load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = TicketFan.networks[networkId]
    if(networkData) {
      const ticketfan = new web3.eth.Contract(TicketFan.abi, networkData.address)
      this.setState({ticketfan})
      const ticketCount = await ticketfan.methods.ticketCount().call()
      this.setState({ ticketCount })
    
    // Load products
    for (var i = 1; i <= ticketCount; i++) {
      const tick = await ticketfan.methods.tickets(i).call()
      this.setState({
        tickets: [...this.state.tickets, tick]
      })
    }

    this.setState({loading: false})
     
      
    } else {
      window.alert('TicketFan contract not deployed to detected network.')
    }



  }

  createTicket(name, price) {
    this.setState({ loading: true })
    this.state.ticketfan.methods.createTicket(name, price).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  purchaseTicket(id, price) {
    this.setState({ loading: true })
    this.state.ticketfan.methods.purchaseTicket(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      ticketCount: 0,
      tickets: [],
      loading: true
    }
    this.createTicket = this.createTicket.bind(this)
    this.purchaseTicket = this.purchaseTicket.bind(this)
  }

  render() {
    return (
      <div>
      <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
          <main role="main" className="col-lg-12 d-flex">
          { this.state.loading
          ? <div id="loader" className="col-lg-12 d-flex text-center"> <img src={logo} className="App-logo" alt="logo" /> </div>
          : <Main
          tickets={this.state.tickets}
          createTicket={this.createTicket}
          purchaseTicket={this.purchaseTicket} />
  }
</main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
