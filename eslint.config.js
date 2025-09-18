import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  {
    ignores: [".react-router/types/**/*.*", "build/"],
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...react.configs.flat.recommended,
    settings: { react: { version: "detect" } },
  },
  react.configs.flat["jsx-runtime"],
  reactHooks.configs["flat/recommended"],
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
        },
      ],
      "no-empty-pattern": "off",
      "react-hooks/exhaustive-deps": "error",
    },
  },
]);
