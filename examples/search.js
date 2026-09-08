/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview 在 developers.google.com/web 上搜索标记为
 * "Headless Chrome" 的文章,并从结果页抓取搜索结果。
 */

import puppeteer from 'puppeteer';

// 启动浏览器并新建页面。
const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto('https://developers.google.com/web/');

// 使用键盘打开搜索菜单。
await page.keyboard.press('/');

// 在搜索框中输入关键词。
await page.type('.devsite-search-field', 'Headless Chrome');

// 等待搜索建议浮层出现,点击"显示全部结果"。
const allResultsSelector = '.devsite-suggest-all-results';
await page.waitForSelector(allResultsSelector);
await page.click(allResultsSelector);

// 等待结果页加载并展示结果。
const resultsSelector = '.gsc-table-result a.gs-title[href]';
await page.waitForSelector(resultsSelector);

// 从页面中提取搜索结果(标题 + 链接)。
const links = await page.evaluate(resultsSelector => {
  const anchors = Array.from(document.querySelectorAll(resultsSelector));
  return anchors.map(anchor => {
    const title = anchor.textContent.split('|')[0].trim();
    return `${title} - ${anchor.href}`;
  });
}, resultsSelector);
console.log(links.join('\n'));

await browser.close();
