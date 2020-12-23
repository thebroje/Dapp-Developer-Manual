import React, { Component } from 'react';
import './App.css';
import web3 from 'web3';
import { election_ABI, election_address } from './config';

class App extends Component {

  componentDidMount() {
  this.loadBlockchainData()
}


constructor(props) {
  super(props)
  this.state = {
    setCandidate: "",  
    candidateName: "",
    account:{} ,
    Contract:{}
  }

  this.handleChange = this.handleChange.bind(this);
  this.handleSetCandidate = this.handleSetCandidate.bind(this);
  this.handleLoadContract = this.handleLoadContract.bind(this);
}

// load the Energi Blockchain 
// use the "https://nodeapi.energi.network" Endpoint to connect to the main network

async loadBlockchainData() {
  const Web3 = require('web3')
  const web3Extension = require('@energi/web3-ext');
  const web3 = new Web3(Web3.givenProvider || "https://nodeapi.test3.energi.network")

  web3Extension.extend(web3);

// instantiate the contract and the Metamask app

  const election = await new web3.eth.Contract(election_ABI, election_address)

  this.setState({Contract: election})

  const accounts = await web3.eth.getAccounts()

  this.setState({account: accounts[0]})


// instantiate the methods of the contract

  const getCandidate = await election.methods.candidateName().call()
  this.setState({candidateName: getCandidate})


}

// handling of the smart contract functions


handleChange(e) {    
  this.setState({ setCandidate: e.target.value });
  console.log (e.target.value);

}

handleSetCandidate(e) {    
  this.state.Contract.methods.setCandidate(this.state.setCandidate).send({from: this.state.account});
}


handleLoadContract() {    
  this.loadBlockchainData();

}

// Dapp rendering

render() {
  return (
    <div className="App">
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a target="_blank" href="https://docs.google.com/document/d/13PmFk3SSZxQxjv8nkJVMKadLOfQg01kZEMaMSBFeH8o/edit#heading=h.bvup6pxrwk6b" className="text-white">
          <h3>Go to the documentation</h3>
          </a>
        </nav>
      </div>


<br/>
<div>
       <h4>set value:</h4> 
      <input type="text" className="form-control" onChange={this.handleChange} placeholder="set candidate..." />
     
      <br />
      <button type="submit" onClick={this.handleSetCandidate} value={this.state.setCandidate} formMethod="set" classname1='navbar-dark bg-dark' className='text-black'>
      press to set a candidate 

      </button>
      
<br/>
<br/>
      <button type="submit" onClick={this.handleLoadContract}  formMethod="get" classname1='navbar-dark bg-dark' className='text-black' id='getCandidate'> 
      Get Candidate name
      </button>
      <br />
      <br />
        <h4>current value: {this.state.candidateName} </h4>
</div>
     
     
      <div className="logo"> </div>

</div>
  );
}
}

export default App;
