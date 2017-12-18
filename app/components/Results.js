import React from "react";
import api from "../utils/api";
import queryString from "query-string";
import Contestant from "./Contestant";
import Loading from "./Loading";

const FunctionalResult = props => {
  const addedClass = `column${props.id}`;
  const img = props.contender.profile.avatar_url;
  const gitUser = props.contender.profile.login;
  const info = props.contender.profile;
  return (
    <div>
      <h1>{props.id === 1 ? "Winner" : "Loser"}</h1>
      <p>Score: {props.contender.score}</p>
      <Contestant img={img} addedClass={addedClass} gitUser={gitUser}>
        <ul>
          {info.name && <li>{info.name}</li>}
          {info.location && <li>{info.location}</li>}
          {info.location && <li>{info.company}</li>}
          <li>Followers: {info.followers}</li>
          <li>Following: {info.following}</li>
          <li>Public Repos: {info.public_repos}</li>
          {info.blog && (
            <li>
              <a href={info.blog}>{info.blog}</a>
            </li>
          )}
        </ul>
      </Contestant>
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
    const players = [winner, loser];
    return (
      <div className="battle-container">
        {loading ? (
          <Loading />
        ) : (
          players.map((index, i) => (
            <FunctionalResult contender={index} id={i + 1} key={i} />
          ))
        )}
      </div>
    );
  }
}
