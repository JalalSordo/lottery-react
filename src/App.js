import "./App.css";
import React from "react";

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      manager: "test-Manager",
      participants: [],
      prize: 0,
      amount: 0,
      winner: "test-winner",
    }
    this.handleChange = this.handleChange.bind(this)
    this.enterLottery = this.enterLottery.bind(this)
    this.pickWinner = this.pickWinner.bind(this)
  }

  handleChange(event) {
    console.log(event.target.name, event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  enterLottery() {
    console.log("entering lottery...")
  }

  pickWinner() {
    console.log("pickign a winner....")
  }

  render() {

    return (

      <div className="content">
        <h1>Lottery Contract</h1>
        <hr></hr>
        <br></br>
        <h4><p>This contract is managed by <span className="important">{this.state.manager}</span></p></h4>
        <h4><p>There are currently <span className="important">{this.state.participants.length}</span> people entered, competing to win <span className="important">{this.state.prize} ether</span></p></h4>
        <br></br>
        <h2>Want to try your luck?</h2>
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <h5><label htmlFor="amount" className="col-form-label">Amount of ether to enter</label></h5>
          </div>
          <div className="col-auto">
            <input type="text" id="amount" name="amount"
              value={this.state.amount}
              onChange={this.handleChange}
              className="form-control" aria-describedby="amountHelpInline" />
          </div>
          <div className="col-auto">
            <span id="amountHelpInline" className="form-text">
              Must be a valid ethereum address
            </span>
          </div>

        </div>
        <div className="align-items-center">
          <input type="button" value="Enter" className="btn btn-primary btn-lg" onClick={this.enterLottery} />
        </div>
        <hr></hr>
        <br></br>
        <h2>Time to pick a winner</h2>
        <br></br>
        <div className="align-items-center">
          <input type="button" value="Pick a Winner" className="btn btn-success btn-lg" onClick={this.pickWinner} />
        </div>
        <br></br>
        <h2>{this.state.winner} has won!</h2>
      </div>
    );
  }
}
export default App;
