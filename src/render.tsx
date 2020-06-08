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

export type BaseOptions = {
  components?: MDXProviderComponents;
};

let graphvizComponents: GraphvizMDXProviderComponents = { Graph, Digraph, Subgraph, Node, Edge, ClusterPortal };

export function register(components: GraphvizMDXProviderComponents): void {
  graphvizComponents = Object.assign(graphvizComponents, components);
}

export function renderToHTML(mdx: string, { components }: BaseOptions = {}): string {
  return renderToString(
    <GraphvizMDXProviderComponentsContext.Provider value={graphvizComponents}>
      <MDXProvider components={{ ...components, Graphviz }}>
        <MDX>{mdx}</MDX>
      </MDXProvider>
    </GraphvizMDXProviderComponentsContext.Provider>,
  );
}
