import React from 'react';
import styled from 'styled-components';
import { AppBarProps } from '@material-ui/core';

import Header from '../components/Header';

export type PageProps = AppBarProps & {
  title: string;
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <PageContainer>
      <Header />
      <MainContent>{children}</MainContent>
    </PageContainer>
  );
};

export default Page;
