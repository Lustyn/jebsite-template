import { __INTERNAL_DO_NOT_USE_OR_YOU_WILL_GET_A_STRONGLY_WORDED_LETTER__ } from "@react-router/dev/internal";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// import babel from "vite-plugin-babel";

const { unstable_reactRouterRSC } =
  __INTERNAL_DO_NOT_USE_OR_YOU_WILL_GET_A_STRONGLY_WORDED_LETTER__;

export default defineConfig({
  plugins: [
    tailwindcss(),
    // BUG: RSCs currently break React compiler
    // babel({
    //   filter: /\.[jt]sx?$/,
    //   loader: "jsx",
    //   babelConfig: {
    //     compact: false,
    //     presets: ["@babel/preset-typescript"],
    //     plugins: [["babel-plugin-react-compiler", { target: "19" }]],
    //   },
    // }),
    unstable_reactRouterRSC(),
    tsconfigPaths(),
  ],
});
