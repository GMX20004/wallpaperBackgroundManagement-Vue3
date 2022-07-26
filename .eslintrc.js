module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-multiple-empty-lines': 'warn', // 不允许有连续多行空行(关闭规则)
    "@typescript-eslint/no-explicit-any": ["off"], // 新增这句话，关闭any报错
    "vue/multi-word-component-names":"off",// 文件命名规则
    'camelcase': [0, {
      'properties': 'always'//强制属性名称为驼峰风格
    }],
    'jsx-quotes': [2, 'prefer-single'],//强制在 JSX 属性中一致地使用双引号或单引号,强制所有不包含单引号的 JSX 属性值使用单引号。
  }
};
