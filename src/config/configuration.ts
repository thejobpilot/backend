import * as process from 'process';

export const config = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  auth0: {
    issuer_url: process.env.AUTH0_ISSUER_URL,
    audience: process.env.AUTH0_AUDIENCE,
  },
  postgres: {
    hostname: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
  }
});
export default config;
