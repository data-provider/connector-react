/*
Copyright 2019 Javier Brea
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

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
