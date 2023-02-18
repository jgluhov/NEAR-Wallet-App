export interface IRGBValue {
  r: number;
  g: number;
  b: number;
}

const componentToHex = (c: number) => {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

export const rgbToHex = (r: number, g: number, b: number) => 
  '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);

export const hexToRgb = (hex: string): IRGBValue | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) {
    return null;
  }

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
}