export const mfConfig = {
  name: "rspack_remote",
  exposes: {
    "./Toast": "./src/index.toast.ts",
  },
  shared: ["react", "react-dom"],
};
