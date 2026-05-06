// apps/admin/postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // Substitui o 'tailwindcss' legado
    autoprefixer: {}, // Mantenha se ainda houver dependência explícita de prefixos legados
  },
};