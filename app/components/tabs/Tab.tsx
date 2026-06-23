'use client';

import { ReactNode } from 'react';

export type TabProps = {
  title: string;
  children: ReactNode;
};

const Tab = ({ children }: TabProps) => {
  return <>{children}</>;
};

export default Tab;
