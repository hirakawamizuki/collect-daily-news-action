const axios = require('axios').default;
const convert = require('xml-js');
const options = {ignoreComment: true, alwaysChildren: true, compact: true};

axios({
    method: 'get',
    url: 'https://news.google.com/rss/search?q=docker+after:2020/12/8&hl=ja&gl=JP&ceid=JP:ja',
}).then(function (res) {
    const xml = res.data;
    const json = convert.xml2js(xml, options);
    const news = json.rss.channel.item;
    console.log(JSON.stringify(news));
}).catch(function (error) {
    console.log(error);
})