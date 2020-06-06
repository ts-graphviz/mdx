import React, { FC } from 'react';
import { Node } from '@ts-graphviz/react';
import dedent from 'ts-dedent';
import { renderToHTML, register } from '../render';

describe('Graphviz', () => {
  describe('renderToHTML', () => {
    test('Digraph', () => {
      const mdx = dedent`
      # Test

      This is test MDX.

      <Graphviz>
        <Digraph>
          <Node id="node1" />
          <Node id="node2" />
          <Node id="node3" />
          <Edge targets={['node1', 'node2']} />
          <Edge targets={['node1', 'node3']} />
        </Digraph>
      </Graphviz>
      `;
      const html = renderToHTML(mdx);
      expect(html).toMatchSnapshot();
    });

    test('Graph', () => {
      const mdx = dedent`
      # Test

      This is test MDX.

      <Graphviz>
        <Graph>
          <Subgraph id="cluster_test">
            <Node id="node1" />
            <Node id="node2" />
          </Subgraph>
          <Node id="node3" />
          <Edge targets={['node1', 'node2']} />
          <Edge targets={['node1', 'node3']} />
        </Graph>
      </Graphviz>
      `;
      const html = renderToHTML(mdx);
      expect(html).toMatchSnapshot();
    });
  });

  test('register custom component', () => {
    // eslint-disable-next-line react/prop-types
    const TestNode: FC<{ id: string }> = ({ id }) => {
      return <Node id={id} fontcolor="red" />;
    };
    register({ TestNode });

    const mdx = dedent`
    # Test

    This is test MDX.

    <Graphviz>
      <Digraph>
        <TestNode id="node1" />
        <TestNode id="node2" />
        <TestNode id="node3" />
        <Edge targets={['node1', 'node2']} />
        <Edge targets={['node1', 'node3']} />
      </Digraph>
    </Graphviz>
    `;
    const html = renderToHTML(mdx);
    expect(html).toMatchSnapshot();
  });
});
