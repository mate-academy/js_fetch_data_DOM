module.exports = {
  extends: ['@mate-academy/eslint-config', 'plugin:cypress/recommended'],
  "rules": {
    "space-before-function-paren": ["error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always",
      'no-console': 'off'
    }]
  }
};
