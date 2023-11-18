/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    ROOT: __dirname,
  }
}

module.exports = nextConfig
