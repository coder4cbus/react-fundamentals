import React from "react";

const Contestant = props => {
  return (
    <div>
      <div className={`contender-container ${props.addedClass}`}>
        <img className="avatar" src={props.img} alt="" />
        <p className="label">@{props.gitUser.toLowerCase()}</p>
        <a
          className="btn"
          onClick={() => {
            props.handleReset(props.name);
          }}
        >
          reset
        </a>
      </div>
    </div>
  );
};

export default Contestant;
