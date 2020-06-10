/* eslint-disable no-case-declarations */
import { renderDot } from '@ts-graphviz/node';
import imageDataUri from 'image-data-uri';
import { SupportedFormat } from '../types';
import { svgToImageDataURL } from './svg';

export function dotToImageDataURL(dot: string, format: SupportedFormat): string {
  const buffer = renderDot(dot, { format });
  switch (format) {
    case 'svg':
      const svg = buffer.toString();
      const src = svgToImageDataURL(svg);
      return src;
    default:
      return imageDataUri.encode(buffer, format);
  }
}
