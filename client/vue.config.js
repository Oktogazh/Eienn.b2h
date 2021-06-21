module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Eienn";
                return args;
            })
    },
    configureWebpack: {
      resolve: {
        alias: {
          vue$: 'vue/dist/vue.esm-bundler.js'
        }
      }
    }
}
