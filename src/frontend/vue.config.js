// 스프링부트 프록시 연결작업
module.exports = {
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