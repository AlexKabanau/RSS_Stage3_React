import React from 'react';
import { ResponseInfoType } from '@/api/getItems';

export default function CharacterLayout({
  children,
}: {
  children: React.ReactNode;
  data: ResponseInfoType;
}) {
  return <>{children}</>;
}
