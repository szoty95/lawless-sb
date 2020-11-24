import React from "react";
import styled from "styled-components";
import { AppBar, AppBarProps, Toolbar, Typography } from "@material-ui/core";

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

const Page: React.FC<PageProps> = ({ children, title, ...rest }) => {
  return (
    <PageContainer>
      <AppBar position="static" {...rest}>
        <Toolbar>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      <MainContent>{children}</MainContent>
    </PageContainer>
  );
};

export default Page;
