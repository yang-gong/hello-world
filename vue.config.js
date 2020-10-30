module.exports={
    devServer:{
        port:80,
        host:'localhost',
        https:false,
        open:true,
        proxy:{
            '/data-view/*':{
                target:"http://xuyanwei.cn:8888/",
                changeOrigin:true,
                ws:true,
                pathRewrite:{
                    '/data-view/*':"/"
                }
            }
        },
        overlay: {
            warning: false,
            errors: false
        }
    }
}