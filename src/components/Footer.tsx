import { Component } from 'react';
// import { ReactComponent as GithubSvg } from '../assets/github_logo_black.svg';
import gitHubLogo from '../assets/github_logo_black.svg';
import RSSLogo from '../assets/rs_logo_black.svg';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="creator">
          <a
            // className="tooltips"
            href="https://github.com/AlexKabanau"
            target="_blank"
            rel="noreferrer"
          >
            <img className="creator__link" src={gitHubLogo} alt="github logo" />
            <span>AlexKabanau</span>
          </a>
        </div>
        <div className="rsschool">
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noreferrer"
          >
            {/* <GithubSvg /> */}
            <img className="rsschool__link" src={RSSLogo} alt="RSSchool logo" />
          </a>
        </div>
      </footer>
    );
  }
}
