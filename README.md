[![NodeCI](https://github.com/ts-graphviz/mdx/workflows/NodeCI/badge.svg)](https://github.com/kamiazya/ts-graphviz/actions?workflow=NodeCI)
[![npm version](https://badge.fury.io/js/%40ts-graphviz%2Fmdx.svg)](https://badge.fury.io/js/%40ts-graphviz%2Fmdx)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# @ts-graphviz/mdx

Embed the Graphviz image in MDX.

## Installation

```bash
# yarn
yarn add @ts-graphviz/mdx
# or npm
npm install @ts-graphviz/mdx
```

## Usage

### Render MDX to HTML

Render MDX to HTML and embed the diagram in Graphviz as an image.

`Diagram`, `Graph`, `Node`, `Edge`, `ClusterPortal` components are provided by default.

Refer to [@ts-graphviz/react](https://github.com/ts-graphviz/react) project for component specifications.

```typescript
import GraphvizMDX from '@ts-graphviz/mdx';

const mdx = `
# Example

This is example MDX.

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
console.log(GraphvizMDX.renderToHTML(mdx));
```

```html
<h1>Test</h1>
<p>This is test MDX.</p>
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAAB0CA...">
```

### Register Custom Component

```typescript
import React, { FC } from 'react';
import GraphvizMDX from '@ts-graphviz/mdx';
import { Node } from '@ts-graphviz/react';

const MyNode: FC<{ id: string }> = ({ id }) => {
  return <Node id={id} fontcolor="red" />;
};
GraphvizMDX.use({
  // register components that can be used within <Graphviz /> component.
  graphviz: { MyNode },
});

const mdx = `
# Example

This is example MDX.

<Graphviz>
  <Digraph>
    <MyNode id="node1" />
    <MyNode id="node2" />
    <MyNode id="node3" />
    <Edge targets={['node1', 'node2']} />
    <Edge targets={['node1', 'node3']} />
  </Digraph>
</Graphviz>
`;
GraphvizMDX.renderToHTML(mdx);
```

## See Also

Graphviz-dot Test and Integration

- [ts-graphviz](https://github.com/ts-graphviz/ts-graphviz)
  - [Graphviz](https://graphviz.gitlab.io/) library for TypeScript.
- [@ts-graphviz/react](https://github.com/ts-graphviz/react)
  - Graphviz-dot Renderer for React.
- [@ts-graphviz/node](https://github.com/ts-graphviz/node)
  - Graphviz adapter for Node.js.
- [jest-graphviz](https://github.com/ts-graphviz/jest-graphviz)
  - Jest matchers that supports graphviz integration.
- [setup-graphviz](https://github.com/ts-graphviz/setup-graphviz)
  - GitHub Action to set up Graphviz cross-platform(Linux, macOS, Windows).

## License

This software is released under the MIT License, see [LICENSE](./LICENSE).
