import React from "react";
import Contender from './Contender';

export default class Battle extends React.Component {
  render() {
    return (
        <div>
            <Contender name={'Camilo'}/>
            <Contender name={'Andrea'}/>
            <Contender name={'Jimena'}/>
        </div>
    );
  }
}
