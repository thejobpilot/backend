import * as process from 'process';

export const config = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  auth0: {
    issuer_url: process.env.AUTH0_ISSUER_URL,
    audience: process.env.AUTH0_AUDIENCE,
  },
});
export default config;
