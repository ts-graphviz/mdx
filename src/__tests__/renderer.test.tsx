import React, { FC } from 'react';
import { Node } from '@ts-graphviz/react';
import dedent from 'ts-dedent';
import { Renderer } from '../renderer';

jest.mock('@ts-graphviz/node', () => ({
  renderDot() {
    return Buffer.from(
      dedent`
      <?xml version="1.0" encoding="UTF-8" standalone="no"?>
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
       "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      <svg width="152pt" height="116pt" viewBox="0.00 0.00 152.44 116.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      </svg>
      `,
    );
  },
}));

describe('Renderer', () => {
  let renderer: Renderer;
  beforeEach(() => {
    renderer = new Renderer();
  });
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
      const html = renderer.renderToHTML(mdx);
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
      const html = renderer.renderToHTML(mdx);
      expect(html).toMatchSnapshot();
    });
  });

  test('register custom component', () => {
    // eslint-disable-next-line react/prop-types
    const TestNode: FC<{ id: string }> = ({ id }) => {
      return <Node id={id} fontcolor="red" />;
    };
    renderer.use({
      graphviz: { TestNode },
    });

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
    const html = renderer.renderToHTML(mdx);
    expect(html).toMatchSnapshot();
  });
});
