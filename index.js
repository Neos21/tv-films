#!/usr/bin/env node

const axios = require('axios');
const cheerio = require('cheerio');

// TBS・テレビ朝日は未検証
const includeKeywords = ['テレビ東京', '午後のロードショー', '日本テレビ', '金曜ロードショー', 'フジテレビ', 'TBS', 'テレビ朝日'];

// Cheerio Element からテキストを抽出し改行・タブを除去して返す
const getText = cheerioElement => cheerioElement.text().trim().replace((/\n|\t/g), ' ').replace((/ +/g), ' ');

(async () => {
  try {
    const response = await axios.get('https://movie.jorudan.co.jp/cinema/broadcast/');
    const $ = cheerio.load(response.data);
    
    const tableElem = $('main > table.tvlist');
    const dateElems  = tableElem.find('th:first-child');
    const metaElems  = tableElem.find('td.tvdate');
    const titleElems = tableElem.find('td.cf > div.detail > div.title');
    const length = Math.min(dateElems.length, metaElems.length, titleElems.length);
    
    const films = [];
    for(let i = 0; i < length; i++) {
      const date  = getText($(dateElems.get(i)));
      const meta  = getText($(metaElems.get(i)));
      const title = getText($(titleElems.get(i)));
      if(includeKeywords.some(keyword => meta.includes(keyword))) films.push({ date, meta, title });
    }
    
    console.log(JSON.stringify(films));
  }
  catch(error) {
    console.log(JSON.stringify({ error: error.toString() }));
  }
})();
