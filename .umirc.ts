import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  history: 'hash',
  base: './',
  publicPath: 'http://www.nicetool.net/static/gifedit/',
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [{ path: '/', component: '../pages/index' }],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: {
          webpackChunkName: true,
        },
        title: 'GIF设计工具',
        dll: false,
        fastClick: true,
        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
};

export default config;
