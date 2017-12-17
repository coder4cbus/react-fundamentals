import React from "react";

const Contestant = props => {
  return (
    <div className={`contender-container ${props.addedClass}`}>
      <img className="avatar" src={props.img} alt="" />
      <p className="label">@{props.gitUser.toLowerCase()}</p>
      {props.children}
    </div>
  );
};

export default Contestant;
