import axios from "axios";

module.exports = {
  battle: username => {
    return axios.get(`https://api.github.com/users/${username}`);
  },
  fetchPopularRepos: language => {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:
        ${language}&sort=stars&order=desc&type=Repositories`);
    return axios.get(encodedURI).then(response => {
      return response.data.items;
    });
  }
};
