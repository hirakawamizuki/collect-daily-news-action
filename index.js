const axios = require('axios').default;
const convert = require('xml-js');
const options = {ignoreComment: true, alwaysChildren: true, compact: true};
const dateFormat = require("dateformat");
const date = new Date();

const keywords = process.argv[2] ? process.argv[2] : "GitHub";
const howManyDays = process.argv[3] ? parseInt(process.argv[3]) : 1;
const after = `after:${dateFormat(date.setDate(date.getDate() - howManyDays), "yyyy-mm-dd")}`;  // e.g. after = "after:2020-12-01"

const googleRssUrl = `https://news.google.com/rss/search?q=${keywords}+${after}&hl=ja&gl=JP&ceid=JP:ja`;

axios({
    method: 'get',
    url: googleRssUrl,
}).then(function (res) {
    const xml = res.data;
    const json = convert.xml2js(xml, options);
    let news;
    if (Array.isArray(json.rss.channel.item)){
        news = json.rss.channel.item.map( data => {
            let item = {};
            item["title"] = data.title._text.replace(/[|()]/g, "");
            item["link"] = data.link._text;
            return item;
        });    
    } else {
        news = [];
    }
    console.log(keywords);
    console.log(after);
    console.log(JSON.stringify(news));
}).catch(function (error) {
    console.log(error);
})