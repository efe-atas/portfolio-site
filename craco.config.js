const webpack = require('webpack');

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            // Markdown dosyaları için loader yapılandırması
            webpackConfig.module.rules.push({
                test: /\.md$/,
                type: 'asset/source'
            });

            // Buffer polyfill'i ekle
            webpackConfig.resolve = {
                ...webpackConfig.resolve,
                fallback: {
                    ...webpackConfig.resolve?.fallback,
                    "buffer": require.resolve("buffer/")
                }
            };

            webpackConfig.plugins = [
                ...webpackConfig.plugins,
                new webpack.ProvidePlugin({
                    Buffer: ['buffer', 'Buffer'],
                })
            ];

            return webpackConfig;
        }
    }
}; 