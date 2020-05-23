//подключаем втроенную библиотеку path для работы с путями
const path = require('path');
//подключаем плагин для работы с html
const HTMLWebpackPlugin = require('html-webpack-plugin');
//подключаем плагин для очистки
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//подключаем плагин для копирования
const CopyWebpackPlugin = require('copy-webpack-plugin');
// подключаем плагин для создания отдельного css файла
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// подключаем два плагина для минификации css файла на продакшене
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

//если вебпак запущен в режиме разработки, то в переменную isDev попадет значение true, в других случаея false
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

//пишем функцию, которая возвращает обьект с плагинами оптимизациями или без, взависимости в каком
//сейчас режиме вебпак, development or production
const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all',
		}
	}
	if(isProd) {
		config.minimizer = [
			new OptimizeCssAssetsWebpackPlugin(),
			new TerserWebpackPlugin()
		]
	}

	return config;
}

//функция которая возвращает строку названия файла с хешем или без в зависимости от режима продакшен или девелопмент
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = { // основной модуль
	context: path.resolve(__dirname, 'src'), //в контексте мы указываем абсолютный путь к папке
											// где будет работать вебпак, в остальных настройках уже не нужно
											// указывать путь к этой папке, только файлы
	mode: 'development', // модефикаторы по умолчанию development(в итоге обычный код) и production(в итоге минифицированный код)
	entry: {
		main: ['@babel/polyfill','./index.jsx'],
	}, // вход, можно сделать несколько
	output: { // выход,
		filename: filename('js'), //название готового файла
		path: path.resolve(__dirname, 'dist') // путь куда будет сохранен файл
	},
	resolve: {
		extensions: ['.js', '.json', '.ts', '.tsx', '.jsx'],
		alias: { // так можно задать специальные ключи для отдельных папок, чтобы в импортах меньше писать
			'@components': path.resolve(__dirname, 'src/components'),
			'@': path.resolve(__dirname, 'src')
		}
	},
	optimization: optimization(), // опримизация для пакетов, если несколько файлов используют один и тотже пакет, например jQuery
					//то тогда вебпак, для того тчобы не дублировать код, создаст отдельный файл с этим пакетом 
	devServer: {
		port: 3000,
		hot: isDev, //позволяет менять данные без перезагрузки страницы, но не в всех случаях
		proxy: {
			"/api": {
				target: "http://localhost:5000"
			}
		}
	},
	devtool: isDev ? 'source-map' : '',
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html', // путь к html файлу, который нужно забандлить
			minify: { 
				collapseWhitespace: isProd, //минифицирует html файл
			}
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, 'src/assets/favicon.ico'),
				to: path.resolve(__dirname, 'dist')
			}
		]),
		new MiniCssExtractPlugin({ // позволяет сделать отдельный css файл
			filename: filename('css'),
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/, //указываем регулярное выражение
				use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {
						hmr: isDev, //позволяет в некоторых случая менять данные без перезагрузки
						reloadAll: true,
					}
				}, 'css-loader'] // если поиск по регулярке прошел, то тогда будет использоваться указанный лоадер
			},
			{
				test: /\.s[ac]ss$/, //указываем регулярное выражение
				use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {
						hmr: isDev, //позволяет в некоторых случая менять данные без перезагрузки
						reloadAll: true,
					}
				}, 'css-loader', 'sass-loader'] // если поиск по регулярке прошел, то тогда будет использоваться указанный лоадер
			},
			{
				test: /\.(png|jpg|svg|gif|jpeg)$/,
				use: ['file-loader']
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: ['file-loader']
			},
			{
				test: /\.js$/,
				exclude: /node_modules/, //исключает папку node_modules
				loader: { //проганяет все js файлы через babel-loader
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env'
						],
						plugins: [
							'@babel/plugin-proposal-class-properties'
						]
					}
				} 
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/, //исключает папку node_modules
				loader: { //проганяет все js файлы через babel-loader
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-typescript'
						],
						plugins: [
							'@babel/plugin-proposal-class-properties'
						]
					}
				} 
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/, //исключает папку node_modules
				loader: { //проганяет все js файлы через babel-loader
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react'
						],
						plugins: [
							'@babel/plugin-proposal-class-properties'
						]
					}
				} 
			}
		]
	}

}