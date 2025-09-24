import type { Metadata } from 'next';

import { MenuItemData } from '@client-common/components/navigations/Menus/LinkMenu';

import "./globals.css";

export const metadata: Metadata = {
  title: 'Tools',
  description: 'A collection of useful tools.',
};

const menuItems: MenuItemData[] = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Convert Transfer',
    url: '/convert-transfer'
  },
  {
    title: 'Splatoon Gear',
    url: '/splatoon-gear'
  }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div style={{ padding: '10px' }}>
          <nav style={{ marginBottom: '20px' }}>
            <a href="/" style={{ marginRight: '10px' }}>Home</a>
            <a href="/convert-transfer" style={{ marginRight: '10px' }}>Convert Transfer</a>
            <a href="/splatoon-gear" style={{ marginRight: '10px' }}>Splatoon Gear</a>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
