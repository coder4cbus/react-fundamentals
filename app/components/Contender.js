import React from "react";

export default class Contender extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.props.name, this.state.name);
  }
  handleChange(e) {
    this.setState({
      name: e.target.value
    });
  }
  render() {
    return (
      <form className="contender-container" onSubmit={this.handleSubmit}>
        <label className="label">Name</label>
        <input className="input" type="text" onChange={this.handleChange} />
        <input className="btn" type="submit" value="Submit" />
      </form>
    );
  }
}
