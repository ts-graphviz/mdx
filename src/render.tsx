import React from 'react';
import { renderToString } from 'react-dom/server';
import MDX from '@mdx-js/runtime';
import { MDXProvider, MDXProviderComponents } from '@mdx-js/react';
import { Graph, Digraph, Subgraph, Node, Edge, ClusterPortal } from '@ts-graphviz/react';
import { Graphviz } from './components/Graphviz';
import {
  GraphvizMDXProviderComponentsContext,
  GraphvizMDXProviderComponents,
} from './contexts/GraphvizMDXProviderComponents';

type BaseOptions = {
  components?: MDXProviderComponents;
};

let graphvizConponents: GraphvizMDXProviderComponents = { Graph, Digraph, Subgraph, Node, Edge, ClusterPortal };

export function register(components: GraphvizMDXProviderComponents): void {
  graphvizConponents = Object.assign(graphvizConponents, components);
}

export function renderToHTML(mdx: string, { components }: BaseOptions = {}): string {
  return renderToString(
    <GraphvizMDXProviderComponentsContext.Provider value={graphvizConponents}>
      <MDXProvider components={{ ...components, Graphviz }}>
        <MDX>{mdx}</MDX>
      </MDXProvider>
    </GraphvizMDXProviderComponentsContext.Provider>,
  );
}
