export default {

    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        ['umi-plugin-react', {
            antd: false,
            dva: true,
            dynamicImport: true,
            title: 'yougame',
            dll: true,
            routes: {

                exclude: [],
            },
            hardSource: false,
        }],
    ],
}
