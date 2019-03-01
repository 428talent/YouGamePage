export default {

    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        ['umi-plugin-react', {
            antd: false,
            dva: {
                dynamicImport: undefined
            },
            dynamicImport: false,
            title: 'yougame',
            dll: false,
            routes: {

                exclude: [],
            },
            hardSource: false,
        }],
    ],
    urlLoaderExcludes: [
        /\.svg$/,
    ],
    chainWebpack(config) {
        config.module.rule('svg')
            .test(/\.svg$/i)
            .use('svg-sprite-loader')
            .loader(require.resolve('svg-sprite-loader'));
    },
}
