import React from "react";
import api from "../utils/api";
import queryString from "query-string";
import Contestant from "./Contestant";

const FunctionalResult = props => {
  const addedClass = `column${props.id}`;
  const img = props.contender.profile.avatar_url;
  const gitUser = props.contender.profile.login;
  return <Contestant img={img} addedClass={addedClass} gitUser={gitUser} />;
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
    const players = [winner, loser];
    return (
      <div>
        {loading
          ? "Loading!!"
          : players.map((index, i) => (
              <FunctionalResult contender={index} id={i + 1} />
            ))}
      </div>
    );
  }
}
// player.map(index => console.log(index))
