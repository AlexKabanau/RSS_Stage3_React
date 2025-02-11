import { Link } from 'react-router';
import gitHubLogo from '../assets/github_logo_black.svg';
import RSSLogo from '../assets/rs_logo_black.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="creator">
        <Link
          to="https://github.com/AlexKabanau"
          target="_blank"
          rel="noreferrer"
        >
          <img className="creator__link" src={gitHubLogo} alt="github logo" />
          <span>AlexKabanau</span>
        </Link>
      </div>
      <div className="rsschool">
        <Link
          to="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          <img className="rsschool__link" src={RSSLogo} alt="RSSchool logo" />
        </Link>
      </div>
    </footer>
  );
}
