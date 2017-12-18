import axios from "axios";

const getProfile = username =>
  axios
    .get(`https://api.github.com/users/${username}`)
    .then(({ data }) => data);

const getRepos = username =>
  axios.get(`https://api.github.com/users/${username}/repos`);

const getStarCount = repos =>
  repos.data.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );

const calculateScore = ({ followers }, repos) =>
  followers * 3 + getStarCount(repos);

function handleError() {
  console.warn(error);
  return null;
}

const getUserData = player => {
  return axios
    .all([getProfile(player), getRepos(player)])
    .then(([profile, repos]) => {
      return {
        profile,
        score: calculateScore(profile, repos)
      };
    });
};

const sortPlayers = players => players.sort((a, b) => b.score - a.score);

module.exports = {
  battle: username => {
    return axios
      .all(username.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },
  fetchPopularRepos: language => {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:
        ${language}&sort=stars&order=desc&type=Repositories`);
    return axios.get(encodedURI).then(response => {
      return response.data.items;
    });
  }
};
