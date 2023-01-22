/* eslint-disable @typescript-eslint/no-var-requires */
const { loadEnvConfig } = require('@next/env');

loadEnvConfig(__dirname);

/** @type {import('graphql-config').IGraphQLConfig} */
const config = {
  schema: {
    'https://api.github.com/graphql': {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      }
    }
  }
};

module.exports = config;
