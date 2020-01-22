module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage',
          corejs: '3.0.0',
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    ],
  };
};
