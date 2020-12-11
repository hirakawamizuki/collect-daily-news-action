const axios = require('axios').default;
const convert = require('xml-js');
const options = {ignoreComment: true, alwaysChildren: true, compact: true};

const keywords = process.argv[2] ? process.argv[2] : "GitHub";
const googleRssUrl = `https://news.google.com/rss/search?q=${keywords}+after:2020/12/10&hl=ja&gl=JP&ceid=JP:ja`;

axios({
    method: 'get',
    url: googleRssUrl,
}).then(function (res) {
    const xml = res.data;
    const json = convert.xml2js(xml, options);
    const news = json.rss.channel.item.map( data => {  // TODO: newsが配列ではない場合のハンドリング
        let item = {};
        item["title"] = data.title._text.replace(/[|()]/g, "");
        item["link"] = data.link._text;
        return item;
    });
    console.log(JSON.stringify(news));
}).catch(function (error) {
    console.log(error);
})