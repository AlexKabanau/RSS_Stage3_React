import React from 'react';

import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div>
      <p>😢 OOPS! Page not found.</p>
      <Link href={'/'}>Home Page</Link>
    </div>
  );
}
