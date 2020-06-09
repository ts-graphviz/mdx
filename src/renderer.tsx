/* eslint-disable class-methods-use-this */
import React, { createElement, FC } from 'react';
import { renderToString } from 'react-dom/server';
import MDX from '@mdx-js/runtime';
import { MDXProvider } from '@mdx-js/react';
import { Graph, Digraph, Subgraph, Node, Edge, ClusterPortal, DOT } from '@ts-graphviz/react';
import { Graphviz } from './components/Graphviz';
import { Components, Plugin } from './types';
import { GraphvizMDXProviderComponentsContext } from './contexts/GraphvizMDXProviderComponents';

export class Renderer {
  private mdx: Components = { Graphviz };

  private graphviz: Components = {
    Graph,
    Digraph,
    Subgraph,
    Node,
    Edge,
    ClusterPortal,
  };

  private remark: any[] = [];

  private rehype: any[] = [];

  public use(plugin: Plugin): this {
    Object.assign(this.mdx, plugin.mdx);
    Object.assign(this.graphviz, plugin.graphviz);
    this.remark.push(plugin.remark ?? []);
    this.rehype.push(plugin.rehype ?? []);
    return this;
  }

  public renderToHTML(mdx: string): string {
    return renderToString(
      <GraphvizMDXProviderComponentsContext.Provider value={this.graphviz}>
        <MDXProvider components={this.mdx}>
          <MDX remarkPlugins={this.remark} rehypePlugins={this.rehype}>
            {mdx}
          </MDX>
        </MDXProvider>
      </GraphvizMDXProviderComponentsContext.Provider>,
    );
  }
}
