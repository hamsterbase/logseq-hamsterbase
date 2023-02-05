import { context } from "esbuild";

const ctx = context({
  entryPoints: ["src/index.ts"],
  outdir: "dist",
  minify: false,
  bundle: true,
  treeShaking: false,
});

ctx.then((re) => {
  re.watch();
});
