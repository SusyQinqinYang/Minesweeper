const path = require('path');

module.exports = {
    entry: path.join(__dirname, './client/app.jsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public/dist')
    },
    module: {
        rules: [
            {
                test: [/\.js$/, /\.jsx?$/],
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}