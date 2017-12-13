import React from "react";

const Contestant = props => {
  return (
    <div>
      <div className={`contender-container ${props.id}`}>
        I am contestant
        <img className="avatar" src={props.img} alt="" />
      </div>
    </div>
  );
};

export default Contestant;
