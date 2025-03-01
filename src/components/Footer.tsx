// import { Link } from 'react-router';
import Link from 'next/link';
import gitHubLogo from '../../public/github_logo_black.svg';
import RSSLogo from '../../public/rs_logo_black.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="creator">
        <Link
          href="https://github.com/AlexKabanau"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="creator__link"
            src={gitHubLogo.src}
            alt="github logo"
          />
          <span>AlexKabanau</span>
        </Link>
      </div>
      <div className="rsschool">
        <Link
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          data-testid="rsschool-link"
        >
          <img
            className="rsschool__link"
            src={RSSLogo.src}
            alt="RSSchool logo"
          />
        </Link>
      </div>
    </footer>
  );
}
