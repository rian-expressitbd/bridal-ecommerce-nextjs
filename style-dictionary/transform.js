export function rgbChannels(token) {
  const value = token.$value || token.value;
  if (typeof value !== "string") {
    throw new Error(`Expected string color value for token ${token.name}`);
  }

  const hex = value.replace("#", "");

  let r = 0, g = 0, b = 0;

  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    throw new Error(`Invalid hex color format: ${value}`);
  }

  return `${r} ${g} ${b}`;
}