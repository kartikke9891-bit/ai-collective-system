module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  rules: {
    'react/display-name': 'warn',
    '@next/next/no-html-link-for-pages': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  },
  ignorePatterns: ['.next', 'out', 'build', 'dist']
};
