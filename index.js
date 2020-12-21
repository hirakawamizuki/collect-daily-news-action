const core = require('@actions/core');
const axios = require('axios').default;
const convert = require('xml-js');
const options = {ignoreComment: true, alwaysChildren: true, compact: true};  // format setting to convert from xml to json
const dateFormat = require('dateformat');
const date = new Date();
const shapeOutput = require('./src/shapeOutput');

// Get inputs
const keywords = core.getInput('keywords') ? core.getInput('keywords').split(/,/) : ['GitHub'];
const howManyDays = core.getInput('how-many-days') ? parseInt(core.getInput('how-many-days')) : 1;
const outputFormat = core.getInput('output-format') ? core.getInput('output-format') : 'json';

// Use Google RSS parameter
const after = `after:${dateFormat(date.setDate(date.getDate() - howManyDays), 'yyyy-mm-dd')}`;  // e.g. after = 'after:2020-12-01'

// Get news data from Google RSS by single keyword
const getNews = async (keyword, after) => {
    // Create url for Google RSS 
    const googleRssUrl = encodeURI(`https://news.google.com/rss/search?q=${keyword}+${after}&hl=ja&gl=JP&ceid=JP:ja`);
    const res = await axios({ method: 'get', url: googleRssUrl })
    const xml = res.data;
    const json = convert.xml2js(xml, options);
    const items = json.rss.channel.item;
    return shapeOutput.toJson(items);
}

// Output news data by using all keywords
Promise.all(keywords.map(async keyword => await getNews(keyword, after)))
.then(res => {
    const jsonOutput = res.reduce((array1, array2) => array1.concat(array2));
    if (outputFormat == 'mrkdwn') {
        const mrkDwnOutput = `"${shapeOutput.toMrkdwn(jsonOutput)}"`;
        core.setOutput("result", mrkDwnOutput);
    } else {  // dafault: json format
        core.setOutput("result", JSON.stringify(jsonOutput));
    }
}).catch(error => {
    core.setFailed(error.message);
});
