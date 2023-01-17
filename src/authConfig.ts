/* eslint-disable no-console */
import { LogLevel, PublicClientApplication } from '@azure/msal-browser';

// Msal Configurations
const config = {
  auth: {
    authority: 'https://login.microsoftonline.com/common',
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID || '',
    redirectUri: 'http://localhost:3000/login',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
          default:
        }
      },
    },
  },
};

// Authentication Parameters
export const loginRequest = {
  scopes: ['User.Read'],
};

export const authConfig = new PublicClientApplication(config);
