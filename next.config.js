/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  output: "standalone",
  env: {
    ROOT: __dirname,
  }
}
 
module.exports = withNextIntl(nextConfig)
