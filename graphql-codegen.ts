import type { CodegenConfig } from '@graphql-codegen/cli';
import cfg from './graphql.config';

const config: CodegenConfig = {
  ...cfg,
  overwrite: true,
  documents: 'src/**/*.(ts|gql)',
  generates: {
    'src/api/sdk.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
    },
  },
  watchConfig: {
    usePolling: true,
    interval: 5000,
  },
  config: {
    scalars: {
      URI: "string"
    }
  },
  watch: ['src/**/*.ts'],
  hooks: { afterAllFileWrite: ['eslint --fix'] },
};

export default config;
