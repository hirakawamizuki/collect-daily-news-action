const axios = require('axios').default;
const convert = require('xml-js');
const options = {ignoreComment: true, alwaysChildren: true, compact: true};  // format setting to convert from xml to json
const dateFormat = require('dateformat');
const date = new Date();
const shapeOutput = require('./src/shapeOutput');

const keywords = process.argv[2] ? process.argv[2] : 'GitHub';
const howManyDays = process.argv[3] ? parseInt(process.argv[3]) : 1;
const outputFormat = process.argv[4] ? process.argv[4] : 'json';

const after = `after:${dateFormat(date.setDate(date.getDate() - howManyDays), 'yyyy-mm-dd')}`;  // e.g. after = 'after:2020-12-01'

const googleRssUrl = `https://news.google.com/rss/search?q=${keywords}+${after}&hl=ja&gl=JP&ceid=JP:ja`;

axios({
    method: 'get',
    url: googleRssUrl,
}).then(function (res) {
    const xml = res.data;
    const json = convert.xml2js(xml, options);
    const items = json.rss.channel.item;
    let jsonOutput;
    if (Array.isArray(items)){
        jsonOutput = items.map(data => {
            let item = {};
            item['title'] = data.title._text.replace(/[|()]/g, '');
            item['link'] = data.link._text;
            return item;
        });
    } else {
        jsonOutput = [];
    }
    const mrkDwnOutput = shapeOutput.toMrkdwn();

    if (outputFormat == 'mrkdwn') {
        console.log(mrkDwnOutput);
    } else {  // dafault: json format
        console.log(JSON.stringify(jsonOutput));
    }
}).catch(function (error) {
    console.log(error);
})