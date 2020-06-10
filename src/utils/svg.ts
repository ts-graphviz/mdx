/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import imageDataURI from 'image-data-uri';

export function svgToImageDataURL(svg: string, imageBasePath = ''): string {
  const dom = new JSDOM();
  dom.window.document.querySelector('body')!.innerHTML = svg;
  const targets = dom.window.document.querySelectorAll('image');
  targets.forEach((target) => {
    const imagePath = target.getAttribute('xlink:href');
    if (imagePath) {
      const imgFormat = path.extname(imagePath).slice(1);
      const image = fs.readFileSync(path.resolve(imageBasePath, imagePath), {
        flag: 'r',
      });
      const imageSrc = imageDataURI.encode(image, imgFormat);
      target.setAttribute('xlink:href', imageSrc);
    }
  });
  const buffer = Buffer.from(
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"\n "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n',
  );
  buffer.write(dom.window.document.querySelector('body')!.innerHTML);

  return imageDataURI.encode(buffer, 'svg+xml');
}
