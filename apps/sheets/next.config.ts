const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [
      path.join(__dirname, "../../packages/ui/styles"),
      path.join(__dirname, "../../node_modules") // add this line
    ],
  },
};

module.exports = nextConfig;
