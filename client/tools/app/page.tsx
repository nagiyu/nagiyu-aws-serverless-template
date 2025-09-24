'use client';

import React from 'react';

import HomePage, { HomePageButton } from '@client-common/pages/HomePage';
import Train from '@client-common/components/data/icon/Train';
import SportsEsports from '@client-common/components/data/icon/SportsEsports';

export default function Home() {
  const buttons: HomePageButton[] = [
    {
      label: 'Convert Transfer',
      icon: <Train />,
      url: '/convert-transfer',
    },
    {
      label: 'Splatoon3 Gear',
      icon: <SportsEsports />,
      url: '/splatoon-gear',
    },
  ];

  return (
    <HomePage buttons={buttons} />
  );
}
