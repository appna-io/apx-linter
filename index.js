var rules = {
  "@typescript-eslint/explicit-function-return-type": "off",
  "@typescript-eslint/no-explicit-any": "warn",
  "react/react-in-jsx-scope": "off",
  "react/prop-types": "off",
  "no-tabs": "off",
  "import/order": "off",
  "import/no-unresolved": "error",
  "import/extensions": [
    "error",
    "ignorePackages",
    {
      "js": "never",
      "jsx": "never",
      "ts": "never",
      "tsx": "never"
    }
  ],
  "no-plusplus": "off",
  "no-shadow": "off",
  "react/require-default-props": "off",
  "react/jsx-indent-props": [
    "error",
    4
  ],
  "react/function-component-definition": "off",
  "react/jsx-indent": [
    "error",
    4
  ],
  "react/jsx-closing-tag-location": "error",
  "react/jsx-filename-extension": [
    1,
    {
      "extensions": [
        ".tsx",
        ".ts"
      ]
    }
  ],
  "import/no-cycle": "warn",
  "jsx-a11y/anchor-is-valid": "off",
  "no-console": "warn",
  "no-debugger": "warn",
  "no-undef": "error",
  "quotes": [
    "error",
    "single"
  ],
  "no-duplicate-imports": "error",
  "comma-spacing": "error",
  "array-bracket-spacing": [
    "error",
    "never"
  ],
  "semi": [
    2,
    "always"
  ],
  "react/jsx-key": "off",
  "linebreak-style": 0,
  "object-curly-spacing": [
    "error",
    "always"
  ],
  "arrow-body-style": 0,
  "indent": [
    2,
    4,
    {
      "SwitchCase": 1
    }
  ],
  "no-trailing-spaces": 0,
  "import/imports-first": "off",
  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": [
    "warn",
    {
      "argsIgnorePattern": "^_"
    }
  ],
  "space-before-function-paren": 0,
  "func-names": 0,
  "new-cap": 0,
  "max-len": [
    2,
    260
  ],
  "no-param-reassign": [
    2,
    {
      "props": false
    }
  ],
  "no-restricted-syntax": [
    1,
    "ForInStatement",
    "LabeledStatement",
    "WithStatement"
  ],
  "class-methods-use-this": 0,
  "comma-dangle": [
    "error",
    "never"
  ],
  "no-underscore-dangle": 0,
  "prefer-destructuring": 0,
  "import/no-named-as-default": 0,
  "@typescript-eslint/ban-types": "off",
  "import/prefer-default-export": 0,
  "@typescript-eslint/no-empty-object-type": "off",
  "object-curly-newline": [
    "error",
    {
      "ObjectExpression": {
        "multiline": true,
        "consistent": true
      },
      "ObjectPattern": {
        "multiline": true,
        "consistent": true
      }
    }
  ],
  "space-infix-ops": [
    "error",
    {
      "int32Hint": false
    }
  ],
  "import/newline-after-import": [
    "error",
    {
      "count": 1
    }
  ],
  "no-multi-spaces": [
    "error"
  ],
  "key-spacing": [
    "error",
    {
      "beforeColon": false,
      "afterColon": true
    }
  ],
  "prefer-const": [
    "error",
    {
      "destructuring": "all",
      "ignoreReadBeforeAssign": true
    }
  ]
};
module.exports = {
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript",
      "airbnb"
    ],
    rules,
    configs: {
      recommended: {
          rules
      }
    }
  }