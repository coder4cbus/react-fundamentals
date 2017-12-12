import React from "react";
import Contender from "./Contender";

export default class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PlayerOneName: "",
      PlayerOnePicture: "",
      PlayerTwoName: "",
      PlayerTwoPicture: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(id, name) {
    this.setState(() => {
      const newState = {};
      newState[`${id}Name`] = name;
      newState[`${id}Picture`] = `https://github.com/${name}.png?size=200`;
      console.log(newState);
      return newState;
    });
  }
  render() {
    return (
      <div className="battle-container">
        <Contender handleSubmit={this.handleSubmit} name={"PlayerOne"} />
        <Contender handleSubmit={this.handleSubmit} name={"PlayerTwo"} />
      </div>
    );
  }
}
