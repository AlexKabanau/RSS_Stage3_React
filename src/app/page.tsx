import React from 'react';
import HomePageContainer from './components/HomePageContainer';

export default function Page({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  return <HomePageContainer searchParams={searchParams} />;
}
