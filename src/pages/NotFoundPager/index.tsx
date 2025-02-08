// import React from 'react';
import { Link } from 'react-router';

export default function NotFoundPager() {
  return (
    <div>
      <p>😢 OOPS! Page not found.</p>
      <Link to={'/'}>Home Page</Link>
    </div>
  );
}
