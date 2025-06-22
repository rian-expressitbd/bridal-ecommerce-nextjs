import StyleDictionary from "style-dictionary";
import { isColor } from "./filter.js";
import { cssVarsPlugin, preset, themeColors } from "./format.js";
import { rgbChannels } from "./transform.js";

// Register transforms
StyleDictionary.registerTransform({
  name: "color/rgb-channels",
  type: "value",
  transitive: true,
  filter: isColor,
  transform: rgbChannels,
});

StyleDictionary.registerTransformGroup({
  name: "tailwind",
  transforms: ["attribute/cti", "name/cti/kebab", "color/rgb", "color/rgb-channels", "size/rem"],
});

// Register formats
StyleDictionary.registerFormat({
  name: "tailwind/css-vars-plugin",
  format: cssVarsPlugin,
});

StyleDictionary.registerFormat({
  name: "tailwind/theme-colors",
  format: themeColors,
});

StyleDictionary.registerFormat({
  name: "tailwind/preset",
  format: preset,
});

// Platform configuration
const tailwindPreset = {
  transformGroup: "tailwind",
  buildPath: "build/tailwind/",
  files: [
    {
      destination: "cssVarsPlugin.js",
      format: "tailwind/css-vars-plugin",
      options: {
        showFileHeader: false,
      },
    },
    {
      destination: "themeColors.js",
      format: "tailwind/theme-colors",
      options: {
        showFileHeader: false,
      },
    },
    {
      destination: "preset.js",
      format: "tailwind/preset",
      options: {
        showFileHeader: false,
      },
    },
  ],
};

const config = {
  source: ["tokens/**/*.json"],
  platforms: {
    tailwindPreset,
  },
};

export default config;