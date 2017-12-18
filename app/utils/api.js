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

const handleError = () => console.warn(error) || null;

const getUserData = player =>
  Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile, repos)
    })
  );

const sortPlayers = players => players.sort((a, b) => b.score - a.score);

export const battle = username =>
  Promise.all(username.map(getUserData))
    .then(sortPlayers)
    .catch(handleError);

export const fetchPopularRepos = language => {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:
      ${language}&sort=stars&order=desc&type=Repositories`);
  return axios.get(encodedURI).then(({ data }) => data.items);
};

// module.exports = {
//   battle: username =>
//     Promise.all(username.map(getUserData))
//       .then(sortPlayers)
//       .catch(handleError),
//   fetchPopularRepos: language => {
//     const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:
//         ${language}&sort=stars&order=desc&type=Repositories`);
//     return axios.get(encodedURI).then(({ data }) => data.items);
//   }
// };
