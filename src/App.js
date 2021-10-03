import "./App.css";
import React from "react";
import web3 from "./web3.js";
import lottery from "./lottery.js";

const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manager: "0x000ebc",
      participants: [],
      prize: 0,
      amount: 0,
      winner: "0x000ebc",
      contractAddress: "",
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.enterLottery = this.enterLottery.bind(this);
    this.pickWinner = this.pickWinner.bind(this);
    console.log("web3 version " + web3.version);
  }
  async componentDidMount() {
    console.log("lottery.addres ", lottery.options.address);
    const manager = await lottery.methods.manager().call();
    const prize = await lottery.methods.getCurrentPrize().call();
    const participants = await lottery.methods.getAllPLayers().call();
    this.setState({
      manager,
      prize: web3.utils.fromWei(prize, "ether"),
      participants,
      contractAddress: lottery.options.address,
    });
  }

  handleChange(evt) {
    if (rx_live.test(evt.target.value))
      this.setState({ amount: evt.target.value });
  }

  async enterLottery() {
    console.log("entering lottery...");
    this.setState({ message: "Waiting on transaction success...." });
    const currentPlayer = await web3.eth.getAccounts();
    console.log(currentPlayer);
    await lottery.methods.enter().send({
      from: currentPlayer[0],
      value: web3.utils.toWei(this.state.amount, "ether"),
    });
    const prize = await lottery.methods.getCurrentPrize().call();
    const participants = await lottery.methods.getAllPLayers().call();
    this.setState({
      message: "",
      participants,
      prize: web3.utils.fromWei(prize, "ether"),
    });
  }

  pickWinner() {
    console.log("pickign a winner....");
  }

  render() {
    return (
      <div className="content">
        <h1>Lottery Contract</h1>
        <h4>
          <p>
            Address in Ethreum network{" "}
            <span className="important">{this.state.contractAddress}</span>
          </p>
        </h4>
        <hr></hr>
        <br></br>
        <h4>
          <p>
            This contract is managed by{" "}
            <span className="important">{this.state.manager}</span>
          </p>
        </h4>
        <h4>
          <p>
            There are currently{" "}
            <span className="important">{this.state.participants.length}</span>{" "}
            people entered, competing to win{" "}
            <span className="important">{this.state.prize} ether</span>
          </p>
        </h4>
        <br></br>
        <h2>Want to try your luck?</h2>
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <h5>
              <label htmlFor="amount" className="col-form-label">
                Amount of ether to enter
              </label>
            </h5>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="amount"
              name="amount"
              value={this.state.amount}
              onChange={this.handleChange}
              pattern="[+-]?\d+(?:[.,]\d+)?"
              placeholder="Enter amount"
              className="form-control"
            />
          </div>
        </div>
        <div className="align-items-center">
          <input
            type="button"
            value="Enter"
            className="btn btn-primary btn-lg"
            onClick={this.enterLottery}
          />
        </div>
        <br></br>
        <h5>{this.state.message}</h5>
        <hr></hr>
        <br></br>
        <h2>Time to pick a winner</h2>
        <br></br>
        <div className="align-items-center">
          <input
            type="button"
            value="Pick a Winner"
            className="btn btn-success btn-lg"
            onClick={this.pickWinner}
          />
        </div>
        <br></br>
        <h2>{this.state.winner} has won!</h2>
      </div>
    );
  }
}
export default App;
