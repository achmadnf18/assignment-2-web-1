import { useMsal } from '@azure/msal-react';
import { Icon } from '@iconify/react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { loginRequest } from 'authConfig';
import { useDispatch } from 'react-redux';
import { loginSocial } from 'store/auth/slice';

export function SocialAuth() {
  const { instance } = useMsal();
  const dispatch = useDispatch();

  return (
    <Stack direction="row" spacing={2}>
      <IconButton
        sx={{
          border: '2px solid #ccc',
          borderRadius: '5px',
          padding: '0.5675rem',
          flex: 1,
        }}
        onClick={() => {
          instance
            .loginPopup(loginRequest)
            .then((res) => dispatch(loginSocial(res.account)))
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log(error);
            });
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <Icon icon="vscode-icons:file-type-azure" color="#DF3E30" width={33} height={33} />
          <Typography>Azure</Typography>
        </Box>
      </IconButton>
    </Stack>
  );
}
