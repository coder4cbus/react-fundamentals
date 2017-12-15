import React from "react";
import api from "../utils/api";
import queryString from "query-string";

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
      console.log(results);
      this.setState = results => {
        return {
          error: "",
          winner: results[0],
          loser: results[1],
          loading: false
        };
      };
    });
  }

  render() {
    //   const [error, winner, loser, loading] = this.state;
    return (
      <div>
        {this.state.loading && "Loading!!"}
        {/* {console.log(loading)} */}
      </div>
    );
  }
}
