module.exports = {
  watchDir: './scripts', // watch观察的目录

  entrance: './bin/index.js', // 应用启动入口用于开发
  params: ['commitMessage', '--rule', '^abc:\\s*.{6, 50}$'], // 用于测试的参数用于开发
  eslintRagne: ['scripts/**/*.js', 'bin/**/*.js'] // 控制eslint检查文件的范围
}