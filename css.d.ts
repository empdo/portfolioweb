import type * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    '--delay'?: `${number}ms`;
    '--text'?: `${string}`;
  }
}
