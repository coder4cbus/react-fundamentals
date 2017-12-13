import React from "react";
import Contender from "./Contender";
import Contestant from "./Contestant";
import { Link } from "react-router-dom";

const BattleButton = props => {
  return (
    <div className="button-display">
      <Link
        className="btn"
        to={{
          pathname: `${props.match.url}/results`,
          search: `?playerOneName=${props.state.PlayerOneName}&playerTwoName=${
            props.state.PlayerTwoName
          }`
        }}
      >
        {" "}
        Battle!{" "}
      </Link>
    </div>
  );
};

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
    this.handleReset = this.handleReset.bind(this);
  }
  handleSubmit(id, name) {
    this.setState(() => {
      const newState = {};
      newState[`${id}Name`] = name;
      newState[`${id}Picture`] = `https://github.com/${name}.png?size=200`;
      return newState;
    });
  }
  handleReset(id) {
    this.setState(() => {
      const newState = {};
      newState[`${id}Name`] = null;
      newState[`${id}Picture`] = null;
      return newState;
    });
  }
  render() {
    const PlayerOneExist = this.state.PlayerOneName;
    const PlayerTwoExist = this.state.PlayerTwoName;
    const BothExist = PlayerOneExist && PlayerTwoExist;
    return (
      <div className="contenders-battle-button">
        <div className="battle-container">
          {!PlayerOneExist && (
            <Contender
              handleSubmit={this.handleSubmit}
              name={"PlayerOne"}
              addedClass={"column1"}
            />
          )}
          {!PlayerTwoExist && (
            <Contender
              handleSubmit={this.handleSubmit}
              name={"PlayerTwo"}
              addedClass={"column2"}
            />
          )}
          {PlayerOneExist && (
            <Contestant
              img={this.state.PlayerOnePicture}
              name={"PlayerOne"}
              addedClass={"column1"}
              gitUser={this.state.PlayerOneName}
              handleReset={this.handleReset}
            />
          )}
          {PlayerTwoExist && (
            <Contestant
              img={this.state.PlayerTwoPicture}
              name={"PlayerTwo"}
              addedClass={"column2"}
              gitUser={this.state.PlayerTwoName}
              handleReset={this.handleReset}
            />
          )}
        </div>
        {BothExist && (
          <BattleButton match={this.props.match} state={this.state} />
        )}
      </div>
    );
  }
}
