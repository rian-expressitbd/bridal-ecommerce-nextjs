import type { Token } from "style-dictionary";

export const isColor = (token: Token): boolean => {
  return (token?.$type || token?.type) === "color";
};
