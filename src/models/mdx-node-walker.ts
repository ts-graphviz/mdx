import React, { FC, ReactNode } from 'react';
import { GraphvizMDXProviderComponents } from '../contexts/GraphvizMDXProviderComponents';

type MDXReactElement = {
  props: {
    mdxType: string;
    originalType: string;
    children?: MDXReactElement[];
    [key: string]: any;
  };
};

export class MDXNodeWalker {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly conponents: GraphvizMDXProviderComponents) {}

  public walk(node: MDXReactElement): ReactNode {
    if (this.conponents[node.props.mdxType]) {
      const Conponent: FC = this.conponents[node.props.mdxType] as any;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { children, mdxType: _0, originalType: _1, ...props } = node.props;
      const nodes: ReactNode[] = children?.map((el) => this.walk(el)) ?? [];
      return React.createElement(Conponent, props, ...nodes);
    }
    return null;
  }
}
