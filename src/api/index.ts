import { GraphQLClient } from 'graphql-request';
import { getSdk } from './sdk';

const getClient = () =>
  getSdk(
    new GraphQLClient("https://api.github.com/graphql", {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN || ""}`,
      },
    }
  ));

export default getClient;
