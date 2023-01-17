/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMsal } from '@azure/msal-react';
import styled from '@emotion/styled';
import { Skeleton } from '@mui/lab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { loginRequest } from 'authConfig';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'store/auth/slice';
import { callMsGraph } from 'utils/graph';

const ContentStyle = styled('div')({
  padding: '5px 10px',
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  background: '#f6f9ff',
});

type GraphProps = {
  displayName: string;
  userPrincipalName: string;
  accessToken: string;
};

export function Header() {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState<GraphProps>();
  const dispatch = useDispatch();

  useEffect(() => {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((res) =>
          setGraphData({ ...res, accessToken: response.accessToken }),
        );
      });
  }, []);

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: '/',
    });
    dispatch(logout());
  };

  return (
    <ContentStyle>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box width="50%">
          {!graphData && (
            <>
              <Skeleton animation="wave" height={18} width="50%" />
              <Skeleton animation="wave" height={18} width="30%" />
            </>
          )}

          {graphData && (
            <>
              <Typography fontSize={14}>Hi, {graphData?.displayName} !</Typography>
              <Typography fontSize={10}>({graphData?.userPrincipalName})</Typography>
            </>
          )}
        </Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', gap: 3, alignItems: 'center' }}
        >
          <Link
            href={`http://localhost:4000/login?login_hint=${graphData?.userPrincipalName}`}
            target="_blank"
          >
            Web 2
          </Link>
          <Button size="small" color="error" variant="outlined" onClick={() => handleLogout()}>
            Logout
          </Button>
        </Box>
      </Stack>
    </ContentStyle>
  );
}
