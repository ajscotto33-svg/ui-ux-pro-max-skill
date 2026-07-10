// NEXT_PUBLIC_BASE_PATH is set in CI when deploying under a sub-path
// (e.g. GitHub Pages serves at /<repo-name>); empty for local dev.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
};

export default nextConfig;
