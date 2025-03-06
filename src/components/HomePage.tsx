import React from 'react';
import { useLoaderData } from 'react-router';

export default function HomePage() {
  const itemsData = useLoaderData();
  return (
    <div>
      HomePage
      <p>{JSON.stringify(itemsData)}</p>
    </div>
  );
}
