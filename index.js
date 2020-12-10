const axios = require('axios').default;
const convert = require('xml-js');
const options = {ignoreComment: true, alwaysChildren: true, compact: true};

axios({
    method: 'get',
    url: 'https://news.google.com/rss/search?q=docker+after:2020/12/08&hl=ja&gl=JP&ceid=JP:ja',
}).then(function (res) {
    const xml = res.data;
    const json = convert.xml2js(xml, options);
    const news = json.rss.channel.item.map( data => {  // TODO: newsが配列ではない場合のハンドリング
        let item = {};
        item["title"] = data.title._text.replace("|", "");
        item["link"] = data.link._text;
        return item;
    });
    console.log(JSON.stringify(news));
}).catch(function (error) {
    console.log(error);
})