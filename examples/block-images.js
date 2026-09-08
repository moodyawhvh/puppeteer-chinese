/**
 * Copyright 2017 Google Inc., PhantomJS Authors All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import puppeteer from 'puppeteer';

// 启动浏览器并新建页面。
const browser = await puppeteer.launch();
const page = await browser.newPage();

// 开启请求拦截:所有图片请求直接中止,其余请求放行。
// 可用于加速页面加载、节省流量。
await page.setRequestInterception(true);
page.on('request', request => {
  if (request.resourceType() === 'image') {
    request.abort();
  } else {
    request.continue();
  }
});

// 打开目标页面(此时图片已被拦截),并对整页截图。
await page.goto('https://news.google.com/news/');
await page.screenshot({path: 'news.png', fullPage: true});

await browser.close();
