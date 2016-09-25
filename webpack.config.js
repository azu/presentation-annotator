const path = require("path");

module.exports = {
    entry: [
        "./src/index.js"
    ],
    devtool: process.env.WEBPACK_DEVTOOL || "source-map",
    output: {
        path: path.join(__dirname, "public", "build"),
        publicPath: "/build/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.json$/, loader: "json"},
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel"
            }
        ],
        // to avoid warning by power-assert-formatter
        exprContextCritical: false
    }
};
