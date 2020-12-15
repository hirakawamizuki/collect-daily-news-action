const axios = require('axios').default;
const convert = require('xml-js');
const options = {ignoreComment: true, alwaysChildren: true, compact: true};  // format setting to convert from xml to json
const dateFormat = require('dateformat');
const date = new Date();
const shapeOutput = require('./src/shapeOutput');

// Get inputs from node command arguments
const keywords = process.argv[2] ? process.argv[2].split(/, */).map(keyword => keyword.replace(/ /g, '+')) : ['GitHub'];
const howManyDays = process.argv[3] ? parseInt(process.argv[3]) : 1;
const outputFormat = process.argv[4] ? process.argv[4] : 'json';

// Creeate google rss url
const after = `after:${dateFormat(date.setDate(date.getDate() - howManyDays), 'yyyy-mm-dd')}`;  // e.g. after = 'after:2020-12-01'
const googleRssUrl = `https://news.google.com/rss/search?q=${keywords[0]}+${after}&hl=ja&gl=JP&ceid=JP:ja`;

axios({
    method: 'get',
    url: googleRssUrl,
}).then(function (res) {
    const xml = res.data;
    const json = convert.xml2js(xml, options);
    const items = json.rss.channel.item;
    const jsonOutput = shapeOutput.toJson(items);

    if (outputFormat == 'mrkdwn') {
        const mrkDwnOutput = shapeOutput.toMrkdwn(jsonOutput);
        console.log(mrkDwnOutput);
    } else {  // dafault: json format
        console.log(JSON.stringify(jsonOutput));
    }
}).catch(function (error) {
    console.log(error);
})