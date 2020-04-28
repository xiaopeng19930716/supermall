/*
 * @Descripttion:
 * @version:
 * @Author: 肖鹏
 * @Date: 2020-04-22 06:33:00
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-22 07:11:00
 */
const puppeteer = require('puppeteer');
// 浏览器基本配置


/**
 * @name: 截全屏
 * @param {String} url   网页url
 * @param {String} toPath 截屏文件输出位置
 * @return: 
 * @msg: 
 * @test: 
 */
export function screenShot(url, toPath) {
  (async () => {
    const browser = await (puppeteer.launch({
      //设置超时时间
      timeout: 15000,
      //如果是访问https页面 此属性会忽略https错误
      ignoreHTTPSErrors: true,
      // 打开开发者工具, 当此值为true时, headless总为false
      devtools: false,
      // 关闭headless模式, 不会打开浏览器
      headless: false
    }));
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({
      path: toPath,
      type: 'png',
      fullPage: true,
    });
    browser.close();
  })();
}