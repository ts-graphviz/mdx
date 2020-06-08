import React, { FC, ReactNode, Children, isValidElement } from 'react';
import { GraphvizMDXProviderComponents } from '../contexts/GraphvizMDXProviderComponents';

type MDXReactElement = {
  props: {
    mdxType: string;
    originalType: string;
    children?: MDXReactElement[] | MDXReactElement;
    [key: string]: any;
  };
};

export class MDXNodeWalker {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly components: GraphvizMDXProviderComponents) {}

  public walk(node: MDXReactElement): ReactNode {
    if (this.components[node.props.mdxType]) {
      const Component: FC<any> = this.components[node.props.mdxType] as any;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { children, mdxType: _0, originalType: _1, ...props } = node.props;
      const nodes: ReactNode[] = Children.toArray(children).map((el) => (isValidElement(el) ? this.walk(el) : el));
      return React.createElement(Component, props, ...nodes);
    }

    return node;
  }
}
