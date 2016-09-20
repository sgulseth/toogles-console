module.exports = {
  settings: {
    runtime: {
      applicationName: 'Toogles Console',
      configWhitelistProperty: 'client',
      port: 9000,
      serve: ['public', 'build/client'],
      favicon: 'favicon.png',
    },
    build: {
      reducers: 'src/redux/reducers/index.js',
      reduxMiddlewares: 'src/redux/middlewares/index.js',
      routes: 'src/routes/index.js',
    },
  },
};
