import React from "react";
import { battle } from "../utils/api";
import queryString from "query-string";
import Contestant from "./Contestant";
import Loading from "./Loading";

const FunctionalResult = ({ id, contender }) => {
  const addedClass = `column${id}`;
  const { profile, score } = contender;
  const {
    name,
    location,
    company,
    followers,
    following,
    public_repos,
    blog,
    avatar_url,
    login
  } = profile;
  return (
    <div>
      <h1>{id === 1 ? "Winner" : "Loser"}</h1>
      <p>Score: {score}</p>
      <Contestant img={avatar_url} addedClass={addedClass} gitUser={login}>
        <ul>
          {name && <li>{name}</li>}
          {location && <li>{location}</li>}
          {location && <li>{company}</li>}
          <li>Followers: {followers}</li>
          <li>Following: {following}</li>
          <li>Public Repos: {public_repos}</li>
          {blog && (
            <li>
              <a href={blog}>{blog}</a>
            </li>
          )}
        </ul>
      </Contestant>
    </div>
  );
};

export default class Results extends React.Component {
  state = {
    error: null,
    winner: null,
    loser: null,
    loading: true
  };

  componentDidMount() {
    const player = queryString.parse(this.props.location.search);
    battle([player.playerOneName, player.playerTwoName]).then(results => {
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
