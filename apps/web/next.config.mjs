/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Obrigatório para o Turbopack ler os arquivos .ts dos pacotes irmãos
  transpilePackages: ["@horazion/ui", "@horazion/types", "@horazion/utils"],
};

export default nextConfig;