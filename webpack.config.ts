import path from "path";
import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

const webpackConfig = (env: { WEBPACK_SERVE: boolean, development: boolean, production: boolean }): Configuration => {
	const AppUrl = env.development ? "/" : "/PhilipCheong-GDB-React-Js-Assignment/"

	return {
		entry: "./src/index.tsx",
		...(env.production || !env.development ? {} : { devtool: "eval-source-map" }),
		resolve: {
			extensions: [".ts", ".tsx", ".js"],
			//@ts-ignore
			plugins: [new TsconfigPathsPlugin()]
		},
		output: {
			path: path.join(__dirname, "/dist"),
			filename: "build.js",
			publicPath: AppUrl
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: "ts-loader",
					options: {
						transpileOnly: true
					},
					exclude: /dist/
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						"style-loader",
						"css-loader",
						"sass-loader",
					],
				},
				{
					test: /\.(jpe?g|gif|png|svg)$/i,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 10000,
								esModule: false,
							}
						}
					]
				},
				{
					test: /\.$/i,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 10000
							}
						}
					]
				}
			]
		},
		devServer: {
			historyApiFallback: true,
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: "./public/index.html",
			}),
			new webpack.DefinePlugin({
				"process.env.PRODUCTION": env.production || !env.development,
				"process.env.NAME": JSON.stringify(require("./package.json").name),
				"process.env.VERSION": JSON.stringify(require("./package.json").version),
				"process.env.AppUrl": JSON.stringify(AppUrl),
			}),
			new webpack.ProvidePlugin({
				process: 'process/browser'
			}),
			new ForkTsCheckerWebpackPlugin({
				eslint: {
					files: "./src/**/*.{ts,tsx,js,jsx}" // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
				}
			})
		]
	}
};

export default webpackConfig;
