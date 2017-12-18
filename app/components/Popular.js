import React from "react";
import api from "../utils/api";
import PropTypes from "prop-types";
import Loading from "./Loading";

const SelectedLanguage = ({ selectedLanguage, updateLanguage }) => {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
  return (
    <div>
      <ul className="languages">
        {languages.map(lang => {
          return (
            <li
              style={lang === selectedLanguage ? { color: "#d0021b" } : null}
              onClick={() => updateLanguage(lang)}
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

const RepoGrid = ({ repos }) => {
  return (
    <ul className="popular-list">
      {repos.map(({ name, id, html_url, owner, stargazers_count }, index) => {
        return (
          <li key={id} className="popular-item">
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <a href={html_url}>
                  <img
                    className="avatar"
                    src={owner.avatar_url}
                    alt={owner.login}
                  />
                </a>
              </li>
              <li>
                <a className="link-space" href={html_url}>
                  {name.substring(0, 15)}
                </a>
              </li>
              <li>@{owner.login}</li>
              <li>{stargazers_count} stars</li>
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
      this.setState(() => ({ repos }));
    });
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  render() {
    const { selectedLanguage, repos } = this.state;
    const { updateLanguage } = this;
    return (
      <div>
        <SelectedLanguage
          selectedLanguage={selectedLanguage}
          updateLanguage={updateLanguage}
        />
        {!repos ? <Loading /> : <RepoGrid repos={repos} />}
      </div>
    );
  }
}

module.exports = Popular;
