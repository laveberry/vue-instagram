// 스프링부트 연결작업

const path = require('path');

// 프록시 설정
module.exports = {
    outputDir: path.resolve(__dirname, "../" + "main/resources/static"),
    devServer:{
        proxy:{
            '/api':{
                target: 'http://localhost:8090',
                ws : true,
                changeOrigin : true
            },
        }
    }
}