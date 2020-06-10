/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { FC, ReactElement, isValidElement, useMemo } from 'react';
import t from 'prop-types';
import { renderToDot } from '@ts-graphviz/react';
import { MDXNodeWalker } from '../models/mdx-node-walker';
import { useGraphvizMDXProviderComponents } from '../hooks/graphviz-mdx-provider-components';
import { SupportedFormat } from '../types';
import { dotToImageDataURL } from '../utils/image';

export type GraphvizProps = {
  alt?: string;
  children: ReactElement;
  format?: SupportedFormat;
};

export const Graphviz: FC<GraphvizProps> = ({ alt, format, children }) => {
  const components = useGraphvizMDXProviderComponents();
  const walker = useMemo(() => new MDXNodeWalker(components), [components]);
  const node = useMemo(() => walker.walk(children), [walker, children]);
  if (isValidElement(node)) {
    const dot = renderToDot(node);
    const src = dotToImageDataURL(dot, format!);
    return <img alt={alt} src={src} />;
  }
  return null;
};

Graphviz.defaultProps = {
  alt: undefined,
  format: 'svg',
};

Graphviz.propTypes = {
  alt: t.string,
  children: t.element.isRequired,
  format: t.oneOf(['png', 'svg', 'jpg']),
};
