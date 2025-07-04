export function cssVarsPlugin({ dictionary }) {
  const vars = dictionary.allTokens
    .map((token) => {
      const value = token?.$value || token?.value;
      return `'--${token.name}': '${value}'`;
    })
    .join(",\n\t\t\t");

  return `import plugin from 'tailwindcss/plugin.js';\n\n` +
    `export default plugin(function ({ addBase }) {\n` +
    `\taddBase({\n` +
    `\t\t':root': {\n` +
    `\t\t\t${vars},\n` +
    `\t\t},\n` +
    `\t});\n` +
    `});\n`;
}

export function themeColors({ dictionary }) {
  const tokens = dictionary.allTokens.filter((token) => 
    (token?.$type || token?.type) === "color"
  );

  const theme = tokens
    .map((token) => {
      return `\t'${token.name}': 'rgb(var(--${token.name}) / <alpha-value>)'`;
    })
    .join(",\n");

  return `export default {\n${theme},\n};\n`;
}

export function preset() {
  return `import type { Config } from 'tailwindcss';\n` +
    `import themeColors from './themeColors';\n` +
    `import cssVarsPlugin from './cssVarsPlugin';\n\n` +
    `const config: Config = {\n` +
    `\ttheme: {\n` +
    `\t\textend: {\n` +
    `\t\t\tcolors: {\n` +
    `\t\t\t\t...themeColors,\n` +
    `\t\t\t},\n` +
    `\t\t},\n` +
    `\t},\n` +
    `\tplugins: [cssVarsPlugin],\n` +
    `};\n\n` +
    `export default config;\n`;
}