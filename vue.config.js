// 스프링부트 프록시 연결작업

const path = require('path');

module.exports = {
    //백단 빌드 타깃 디렉터리 설정
    outputDir: path.resolve(__dirname, "../" + "main/resources/static"),
    devServer:{
        proxy:{
            '/api':{
                target: 'http://localhost:9000',
                ws:true,
                changeOrigin:true
            },
        }
    }
}