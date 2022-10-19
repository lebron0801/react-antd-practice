module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  // 提供的是 eslint 现有规则的一系列预设，可配置其他预设
  extends: ['plugin:@typescript-eslint/recommended', 'react-app', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    _: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true
    }
  },
  // 解析器，将 TypeScript 转换为 ESTree，使 eslint 可以识别
  parser: '@typescript-eslint/parser',
  // 插件则提供了除预设之外的自定义规则，当你在 eslint 的规则里找不到合适的的时候就可以借用插件来实现了
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 不允许使用var来定义变量
    'no-var': 'error',
    'prettier/prettier': 'error',
    // 取消未使用的变量校验
    '@typescript-eslint/no-unused-vars': 'off',
    // 取消空函数校验
    '@typescript-eslint/no-empty-function': 'off',
    // 取消require语句导入校验
    '@typescript-eslint/no-var-requires': 'off',
    // 取消any类型定义校验，即允许使用any来定义数据类型
    '@typescript-eslint/no-explicit-any': 'off',
    // 取消函数显示申明返回类型校验
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 取消在导出为模块默认值之前将箭头函数分配给变量校验
    'import/no-anonymous-default-export': 'off',
    // 取消a标签锚点href属性校验
    'jsx-a11y/anchor-is-valid': 'off',
    // 取消非空断言校验，比如 !. ?. 等语法
    '@typescript-eslint/no-non-null-assertion': 'off',
    // 取消typescript中三斜线引用d.ts文件校验
    '@typescript-eslint/triple-slash-reference': 'off',
    // 取消定义的变量未使用校验
    'no-unused-vars': 'off'
  }
};
