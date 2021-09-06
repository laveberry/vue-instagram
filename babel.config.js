module.exports = {
  // presets: [
  //   '@vue/cli-plugin-babel/preset'
  // ]
  
  //스프링부트 연결
  outputDir : '../src.main/resources/static',
  indexpath : "../static/index.html",
  devServer : {
    port : 9091,
    proxy : "http://localhost:9191", //devServer : spring boot의 내장 was주소
  },
  chainWebpack : config => {
    const svgRule = confing.module.rule("svg");
    svgRule.uses.clear();
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  }
};
