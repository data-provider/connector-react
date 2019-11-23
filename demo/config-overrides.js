module.exports = function override(config) {
  // Remove eslint execution for running app
  let eslintRuleIndex;
  config.module.rules.forEach((rule, ruleIndex) => {
    if (rule.use && Array.isArray(rule.use)) {
      rule.use.forEach(loaderDetails => {
        if (loaderDetails.loader.indexOf("eslint-loader") > -1) {
          eslintRuleIndex = ruleIndex;
        }
      });
    }
  });
  if (eslintRuleIndex) {
    config.module.rules.splice(eslintRuleIndex, 1);
  }

  // Add babel alias for data-provider/connector-react
  config.module.rules.unshift({
    test: /\.(js|jsx|mjs)$/,
    include: /src/,
    loader: require.resolve("babel-loader"),
    options: {
      plugins: [
        [
          "module-resolver",
          {
            root: ["."],
            alias: {
              "@data-provider/connector-react":
                "./src/connector-react/data-provider-connector-react.esm.js"
            }
          }
        ]
      ],
      cacheDirectory: true
    }
  });

  return config;
};
