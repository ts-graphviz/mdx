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
import { renderToHTML } from '@ts-graphviz/mdx';

const mdx = `
# Sample

This is sample MDX.

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
console.log(renderToHTML(mdx));
```

```html
<h1>Test</h1>
<p>This is test MDX.</p>
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAAB0CA...">
```

### Register Custom Component

```typescript
import React, { FC } from 'react';
import { renderToHTML, register } from '@ts-graphviz/mdx';
import { Node } from '@ts-graphviz/react';

const MyNode: FC<{ id: string }> = ({ id }) => {
  return <Node id={id} fontcolor="red" />;
};
register({ MyNode });

const mdx = `
# Test

This is test MDX.

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
renderToHTML(mdx);
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
