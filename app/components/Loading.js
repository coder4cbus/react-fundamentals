import React from "react";

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text
    };
  }
  componentDidMount() {
    const stopper = `${this.state.text}...`;
    this.interval = window.setInterval(() => {
      if (this.state.text === stopper) {
        this.setState(() => {
          return {
            text: this.props.text
          };
        });
      } else {
        this.setState(prevState => {
          return {
            text: `${prevState.text}.`
          };
        });
      }
    }, this.props.speed);
  }
  componenWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    const styles = {
      content: {
        textAlign: "center",
        fontSize: "35px"
      }
    };
    return <p style={styles.content}>{this.state.text}</p>;
  }
}

Loading.defaultProps = {
  text: "Loading",
  speed: 300
};
