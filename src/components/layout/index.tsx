import { AuthenticatedTemplate } from '@azure/msal-react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import DividerMUI from '@mui/material/Divider';
import { Outlet } from 'react-router-dom';

import { Header } from './header';

const RootStyle = styled('div')({
  display: 'grid',
  placeItems: 'center',
  color: 'black',
});

const Divider = styled(DividerMUI)({
  margin: '3px 0',
  border: 'none',
});

export function Layout() {
  return (
    <main className="lg:px-6">
      <RootStyle>
        <Container maxWidth="sm">
          <AuthenticatedTemplate>
            <Header />
            <Divider />
          </AuthenticatedTemplate>
          <Outlet />
        </Container>
      </RootStyle>
    </main>
  );
}

export default Layout;
