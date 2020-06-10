import { FC } from 'react';
import { MDXProviderComponents } from '@mdx-js/react';
import { Fromat as Format } from '@ts-graphviz/node';

export type Components = { [key: string]: FC<any> };

export type Plugin = {
  mdx?: MDXProviderComponents;
  graphviz?: Components;
  remark?: any[];
  rehype?: any[];
};

export type SupportedFormat = Exclude<Format, 'json' | 'xdot' | 'pdf'>;
