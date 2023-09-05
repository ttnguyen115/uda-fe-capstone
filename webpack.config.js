const path = require("path");

module.exports = {
  entry: "./src/client/index.js",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.scss$/, // Match .scss files
        use: [
          "style-loader", // Inject styles into the DOM
          "css-loader", // Transpile CSS to CommonJS
          "sass-loader", // Compile Sass/SCSS to CSS
        ],
      },
    ],
  },
};
