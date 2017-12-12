import React from "react";
import Contender from "./Contender";
import Contestant from "./Contestant";

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
      return newState;
    });
  }
  render() {
    const PlayerOneExist = this.state.PlayerOneName;
    const PlayerTwoExist = this.state.PlayerTwoName;

    return (
      <div className="battle-container">
        {!PlayerOneExist && (
          <Contender handleSubmit={this.handleSubmit} name={"PlayerOne"} />
        )}
        {!PlayerTwoExist && (
          <Contender handleSubmit={this.handleSubmit} name={"PlayerTwo"} />
        )}
      </div>
    );
  }
}
