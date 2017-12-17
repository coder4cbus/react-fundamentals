import React from "react";
import api from "../utils/api";
import queryString from "query-string";
import Contestant from "./Contestant";

const FunctionalResult = props => {
  const imgW = props.winner.profile.avatar_url;
  const imgL = props.loser.profile.avatar_url;
  const gitUserW = props.winner.profile.login;
  const gitUserL = props.loser.profile.login;
  console.log(props);
  return (
    <div className="battle-container">
      <Contestant addedClass={"column1"} img={imgW} gitUser={gitUserW} />
      <Contestant addedClass={"column2"} img={imgL} gitUser={gitUserL} />
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
