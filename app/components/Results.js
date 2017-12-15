import React from "react";
import api from "../utils/api";
import queryString from 'query-string';


export default class Results extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            error:'',
            winner:[],
            loser: [],
            loading:true,
        }
    }

    componentDidMount(){
        const player = queryString.parse(this.props.location.search);
        api.battle([
            player.playerOneName,
            player.playerTwoName
            ])
            .then(results =>{
            console.log(results)
        });
    }

  render() {
    return (
      <div>
        {this.state.loading && 'Loading!!'}

      </div>
    );
  }
}
