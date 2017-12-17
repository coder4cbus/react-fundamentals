import React from "react";
import api from "../utils/api";
import queryString from "query-string";
import Contestant from "./Contestant";

const FunctionalResult = props => {
  return (
    <div className="battle-container">
      <div className="Column1 contender-container">
        <h1>Winner !!</h1>
        <img className="avatar" src={props.winner.profile.avatar_url} />
        <p className="label">{props.winner.score}</p>
      </div>
      <div className="Column2 contender-container">
        <h1>Loser !!</h1>
        <img className="avatar" src={props.loser.profile.avatar_url} />
        <p className="label">{props.loser.score}</p>
      </div>
    </div>
  );
};

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      winner: null,
      loser: null,
      loading: true
    };
  }

  componentDidMount() {
    const player = queryString.parse(this.props.location.search);
    api.battle([player.playerOneName, player.playerTwoName]).then(results => {
      const [winner, loser] = results;
      this.setState(() => {
        return {
          error: "",
          winner: winner,
          loser: loser,
          loading: false
        };
      });
    });
  }
  render() {
    const { error, winner, loser, loading } = this.state;

    return (
      <div>
        {loading ? (
          "Loading!!"
        ) : (
          <FunctionalResult winner={winner} loser={loser} />
        )}
      </div>
    );
  }
}
