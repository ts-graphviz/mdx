import React, { FC, ReactElement, isValidElement } from 'react';
import t from 'prop-types';
import { renderToDot } from '@ts-graphviz/react';
import { renderDot } from '@ts-graphviz/node';
import imageDataUri from 'image-data-uri';
import { MDXNodeWalker } from '../models/mdx-node-walker';
import { useGraphvizMDXProviderComponents } from '../hooks/graphviz-mdx-provider-components';

export type GraphvizProps = {
  alt?: string;
  children: ReactElement;
};

export const Graphviz: FC<GraphvizProps> = ({ alt, children }) => {
  const components = useGraphvizMDXProviderComponents();
  const worker = new MDXNodeWalker(components);
  const node = worker.walk(children);
  if (isValidElement(node)) {
    const format = 'png';
    const dot = renderToDot(node);
    console.log(dot);
    const buffer = renderDot(dot, { format });
    const src = imageDataUri.encode(buffer, format);
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img alt={alt} src={src} />;
  }
  return null;
};

Graphviz.defaultProps = {
  alt: undefined,
};

Graphviz.propTypes = {
  alt: t.string,
  children: t.element.isRequired,
};
