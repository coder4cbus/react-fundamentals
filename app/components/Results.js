import React from "react";
import { getProfile } from "../utils/api";

export default class Results extends React.Component {
  render() {
    return (
      <div>
        Results!!
        {console.log(getProfile)}
      </div>
    );
  }
}
