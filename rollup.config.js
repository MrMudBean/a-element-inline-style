import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import terser from '@rollup/plugin-terser';
// import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';
import { external } from '@qqi/rollup-external';

export default {
  input: './src/index.ts',
  output: ['es', 'cjs'].map(e => ({
    format: e, // 打包模式
    entryFileNames: '[name].js', // 输出文件名
    preserveModules: true, //保留独立模块结构（关键）
    preserveModulesRoot: 'src', // 保持 src 目录结构
    sourcemap: false, // 关闭 source map
    exports: 'named', // 导出模式
    dir: `dist/${e}/`, // 输出文件夹
  })),
  // 配置需要排除的包
  external: external(),
  plugins: [
    resolve(),
    commonjs(),
    typescript({}),
    // 在使用的时候在进行压缩打包
    // terser(),
    // cleanup(),
    copy({
      targets: [
        { src: 'README.md', dest: 'dist' },
        { src: 'LICENSE', dest: 'dist' },
      ],
    }),
  ],
};
