import { FC } from 'react';
import { MDXProviderComponents } from '@mdx-js/react';

export type Components = { [key: string]: FC<any> };

export type Plugin = {
  mdx?: MDXProviderComponents;
  graphviz?: Components;
  remark?: any[];
  rehype?: any[];
};
