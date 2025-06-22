import StyleDictionary from "style-dictionary";
import { isColor } from "./filter";
import { cssVarsPlugin, preset, themeColors } from "./format";
import { rgbChannels } from "./transform";

// Register transforms
StyleDictionary.registerTransform({
  name: "color/rgb-channels",
  type: "value",
  transitive: true,
  filter: isColor, // Changed from matcher to filter
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
      destination: "cssVarsPlugin.ts",
      format: "tailwind/css-vars-plugin",
      options: {
        showFileHeader: false,
      },
    },
    {
      destination: "themeColors.ts",
      format: "tailwind/theme-colors",
      options: {
        showFileHeader: false,
      },
    },
    {
      destination: "preset.ts",
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
