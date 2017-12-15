import axios from "axios";

const getProfile = (username)=>{
  return (axios.get(`https://api.github.com/users/${username}`)
    .then(user=> user.data))
}

const getRepos = (username)=>{
  return axios.get(`https://api.github.com/users/${username}/repos`)
}

const getStarCount = (repos)=>{
  return repos.data.reduce((count,repo)=>{
    return count + repo.stargazers_count;
  },0);
}

const calculateScore = (profile,repos)=>{
  const followers = profile.followers;
  const totalStars = getStarCount(repos);
  return (followers*3)+totalStars;
}

function handleError(){
  console.warn(error);
  return null;
}

const getUserData = (player)=>{
  return axios.all(
    getProfile(player),
    getRepos(player)
  ).then((data)=>{
    return {
      profile: data[0],
      score: data[1]
    }
  });
}

module.exports = {
  battle: username => {
    console.log(username)
    return getProfile(username);
  },
  fetchPopularRepos: language => {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:
        ${language}&sort=stars&order=desc&type=Repositories`);
    return axios.get(encodedURI).then(response => {
      return response.data.items;
    });
  }
};
