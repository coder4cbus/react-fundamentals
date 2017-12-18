import React from "react";
import PropTypes from "prop-types";

export default class Contender extends React.Component {
  static propTypes = {
    addedClass: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
  };
  state = {
    name: ""
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit(this.props.name, this.state.name);
  };
  handleChange = e => {
    this.setState({
      name: e.target.value
    });
  };
  render() {
    return (
      <form
        className={`contender-container ${this.props.addedClass}`}
        onSubmit={this.handleSubmit}
      >
        <label className="label">{this.props.name}</label>
        <input className="input" type="text" onChange={this.handleChange} />
        <button className="btn" type="submit" disabled={!this.state.name}>
          Submit
        </button>
      </form>
    );
  }
}
