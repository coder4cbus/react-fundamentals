import React from 'react';
import api from '../utils/api'

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos:null,
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos:null,
      }
    });
    api.fetchPopularRepos(lang)
    .then((repos)=>{
      console.log(repos)
    })
  }
  componentDidMount(){
    this.updateLanguage(this.state.selectedLanguage);
  }
  render() {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
      <div>
        <ul className='languages'>
          {languages.map(function (lang) {
            return (
              <li
                style={lang === this.state.selectedLanguage ? {color: '#d0021b'} : null}
                onClick={this.updateLanguage.bind(null, lang)}
                key={lang}>
                  {lang}
              </li>
            )
          }, this)}
        </ul>
      </div>
    )
  }
}

module.exports = Popular;
