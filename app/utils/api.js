const getProfile = async username => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  return response.json();
};

const getRepos = async username => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  return response.json();
};
const getStarCount = repos =>
  repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0);

const calculateScore = ({ followers }, repos) =>
  followers * 3 + getStarCount(repos);

const handleError = () => console.warn(error) || null;

const getUserData = async player => {
  const [profile, repos] = await Promise.all([
    getProfile(player),
    getRepos(player)
  ]);
  return {
    profile,
    score: calculateScore(profile, repos)
  };
};

const sortPlayers = players => players.sort((a, b) => b.score - a.score);

export const battle = async username => {
  const results = await Promise.all(username.map(getUserData)).catch(
    handleError
  );
  return results === null ? results : sortPlayers(results);
};

export const fetchPopularRepos = async language => {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:
      ${language}&sort=stars&order=desc&type=Repositories`);
  const response = await fetch(encodedURI).catch(handleError);
  const repos = await response.json();
  return repos.items;
};
