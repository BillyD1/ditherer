// @flow

import type { ColorRGBA } from "types";

export const quantizeValue = (value: number, levels: number): number => {
  const step = 255 / (levels - 1);
  const bucket = Math.round(value / step);
  return Math.round(bucket * step);
};

export const uniqueColors = (buf: Uint8ClampedArray): { [string]: number } => {
  const seen = {};

  for (let i = 0; i < buf.length; i += 4) {
    const key = `${buf[i]}-${buf[i + 1]}-${buf[i + 2]}-${buf[i + 3]}`;

    if (typeof seen[key] === "number") {
      seen[key] += 1;
    } else {
      seen[key] = 1;
    }
  }

  return seen;
};

export const rgba = (r: number, g: number, b: number, a: number): ColorRGBA => [
  r,
  g,
  b,
  a
];

// Preserves nulls
export const scaleMatrix = (
  mat: Array<Array<?number>>,
  scale: number
): Array<Array<?number>> =>
  mat.map(row => row.map(col => (col ? col * scale : col)));

export const add = (a: ColorRGBA, b: ColorRGBA): ColorRGBA => [
  a[0] + b[0],
  a[1] + b[1],
  a[2] + b[2],
  a[3] + b[3]
];

export const sub = (a: ColorRGBA, b: ColorRGBA): ColorRGBA => [
  a[0] - b[0],
  a[1] - b[1],
  a[2] - b[2],
  a[3] - b[3]
];

export const scale = (a: ColorRGBA, scalar: number): ColorRGBA => [
  scalar * a[0],
  scalar * a[1],
  scalar * a[2],
  scalar * a[3]
];

export const getBufferIndex = (x: number, y: number, width: number): number =>
  (x + width * y) * 4;

// FIXME: Make signature consistent with addBufferPixel
export const fillBufferPixel = (
  buf: Uint8ClampedArray | Array<number>,
  i: number,
  r: number,
  g: number,
  b: number,
  a: number
) => {
  buf[i] = r; // eslint-disable-line
  buf[i + 1] = g; // eslint-disable-line
  buf[i + 2] = b; // eslint-disable-line
  buf[i + 3] = a; // eslint-disable-line
};

export const addBufferPixel = (
  buf: Uint8ClampedArray | Array<number>,
  i: number,
  color: ColorRGBA
) => {
  buf[i] += color[0]; // eslint-disable-line
  buf[i + 1] += color[1]; // eslint-disable-line
  buf[i + 2] += color[2]; // eslint-disable-line
  buf[i + 3] += color[3]; // eslint-disable-line
};

export const cloneCanvas = (
  original: HTMLCanvasElement,
  copyData: boolean = true
) => {
  const clone = document.createElement("canvas");

  clone.width = original.width;
  clone.height = original.height;

  const cloneCtx = clone.getContext("2d");

  if (cloneCtx && copyData) {
    cloneCtx.drawImage(original, 0, 0);
  }

  return clone;
};
