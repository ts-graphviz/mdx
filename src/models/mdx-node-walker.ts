/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, ReactNode, Children, isValidElement, ReactElement } from 'react';
import { GraphvizMDXProviderComponents } from '../contexts/GraphvizMDXProviderComponents';

type MDXReactElement = {
  $$typeof?: symbol;
  type: any;
  props: {
    mdxType: string;
    originalType: string;
    children?: MDXReactElement[] | ReactElement[];
    [key: string]: any;
  };
};

export class MDXNodeWalker {
  private readonly set: Set<FC<any>> = new Set();

  private readonly components: Map<string, FC<any>> = new Map();

  constructor(components: GraphvizMDXProviderComponents) {
    this.components = new Map(Object.entries(components));
    this.set = new Set(Object.values(components));
  }

  private walkChildren(children?: (MDXReactElement | ReactElement)[]): ReactNode[] {
    return children !== undefined
      ? Children.toArray(children).map((el) => (isValidElement(el) ? this.walk(el) : el))
      : [];
  }

  public walk(node: MDXReactElement | ReactElement): ReactNode {
    const Component = this.components.get(node.props.mdxType);
    if (this.set.has(node.type)) {
      const { type: _, children, ...props } = node.props;
      return React.createElement(node.type, props, ...this.walkChildren(children));
    }
    if (Component !== undefined) {
      const { children, mdxType: _0, originalType: _1, ...props } = node.props;
      return React.createElement(Component, props, ...this.walkChildren(children));
    }

    return node;
  }
}
