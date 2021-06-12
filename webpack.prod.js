const HtmlWebPackPlugin    =require('html-webpack-plugin');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');
const copyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
 
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            test: /\.js(\?.*)?$/i,
        })],
      },
    output: {
        filename: 'main.[contenthash].js',
        clean: true
    },
  
    module:{
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [
                 "babel-loader",
                   ]
              },
            {
          test: /\.css$/,
          exclude:/styles\.css$/,
          use: [
              'style-loader',
              'css-loader'
          ]
        },
        {
            test: /styles\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader'
          ]

        },
            //Sirven para decirle que hacer con los distintos tipos de archivo
            {
                //Es la condición que debe cumplir, se usan expresiones regulares
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false,
                    minimize: false,
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options:{
                         esModule: false
                        }
                    }
                ]
            }
        ],
    },
    //Aquí se ejecuta la instancia que hemos creado antes para que copie el index html de la carpeta src a dist para cuando se suba a producción
    plugins:[
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'[name].[contenthash].css',
            ignoreOrder:false
        }),
        new copyPlugin({
            patterns: [
            {
                from: 'src/assets', to: 'assets/' },
        ]}),
    ]
 
}