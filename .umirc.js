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
}
