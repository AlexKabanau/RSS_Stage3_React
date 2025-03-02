// import { Link } from 'react-router';

import Link from 'next/link';

export default function NotFoundPager() {
  return (
    <div>
      <p>😢 OOPS! Page not found.</p>
      <Link href={'/'}>Home Page</Link>
    </div>
  );
}
