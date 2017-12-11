import React from "react";
import api from "../utils/api";
import PropTypes from "prop-types";

const SelectedLanguage = props => {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
  return (
    <div>
      <ul className="languages">
        {languages.map(lang => {
          return (
            <li
              style={
                lang === props.selectedLanguage ? { color: "#d0021b" } : null
              }
              onClick={() => props.updateLanguage(lang)}
              key={lang}
            >
              {lang}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
const RepoGrid = props => {
  return (
    <ul className="popular-list">
      {props.repos.map((repo, index) => {
        return (
          <li key={repo.id} className="popular-item">
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt={repo.owner.login}
                />
              </li>
              <li>
                <a className="link-space" href={repo.html_url}>
                  {repo.name.substring(0, 15)}
                </a>
              </li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

SelectedLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired
};

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All",
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang,
        repos: null
      };
    });
    api.fetchPopularRepos(lang).then(repos => {
      this.setState(() => {
        return { repos };
      });
    });
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  render() {
    return (
      <div>
        <SelectedLanguage
          selectedLanguage={this.state.selectedLanguage}
          updateLanguage={this.updateLanguage}
        />
        {!this.state.repos ? (
          <p>Loading</p>
        ) : (
          <RepoGrid repos={this.state.repos} />
        )}
      </div>
    );
  }
}

module.exports = Popular;
