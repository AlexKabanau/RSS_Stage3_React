// import { Link } from 'react-router';
import React from 'react';
import { Link } from 'react-router';

// import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div>
      <p>😢 OOPS! Page not found.</p>
      <Link to={'/'}>Home Page</Link>
    </div>
  );
}
