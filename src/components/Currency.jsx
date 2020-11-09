import React, { Component } from "react";

class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MXNQuantity: 0,
      USDQuantity: 0,
    };

    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }

  handleCurrencyChange({ target: { value, name } }) {
    let MXNCurrentQuantity;
    let USDCurrentQuantity;

    if (name === "MXNQuantity") {
       
    localStorage.setItem("MXNCurrentQuantity",value)
      MXNCurrentQuantity = value;
      USDCurrentQuantity = value / 21.6;
    } else {
      MXNCurrentQuantity = value * 21.6;
      USDCurrentQuantity = value;
    }
    this.setState({        
      MXNQuantity: MXNCurrentQuantity,
      USDQuantity: USDCurrentQuantity,
    });
  }

  render() {
    const { MXNQuantity, USDQuantity } = this.state;
    return (
      <div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          onSubmit={this.handleSubmit}
        >
          MXN:{" "}
          <input
            type="number"
            value={MXNQuantity}
            onChange={this.handleCurrencyChange}
            name="MXNQuantity"
          />
          USD:{" "}
          <input
            type="number"
            value={USDQuantity}
            onChange={this.handleCurrencyChange}
            name="USDQuantity"
          />
        </form>
      </div>
    );
  }
}

export default Currency;