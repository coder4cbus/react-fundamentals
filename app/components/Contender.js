import React from "react";

export default class Contender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Type the Github user"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
