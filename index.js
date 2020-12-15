const axios = require('axios').default;
const convert = require('xml-js');
const options = {ignoreComment: true, alwaysChildren: true, compact: true};  // format setting to convert from xml to json
const dateFormat = require('dateformat');
const date = new Date();

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
    let news;
    if (Array.isArray(items)){
        if (outputFormat == 'mrkdwn') {
            news = "<https://codezine.jp/article/detail/13341|「Kubernetes 1.20」がリリース、11の拡張機能が安定版へ、15の拡張機能がベータ版へ移行 - CodeZine（コードジン）>\\n\\n<https://www.jiji.com/jc/article?k=000003599.000005875&g=prt|セキュリティコンテストCTFの花形ジャンルpwnableの解説書！ 『解題pwnable セキュリティコンテストに挑戦しよう！』発行! 技術の泉シリーズ、12月の新刊 - 時事通信>\\n\\n<https://japan.techrepublic.com/article/35163707.htm|「Kubernetes」入門--大規模な展開に最適なコンテナーオーケストレーションシステム - TechRepublic Japan>";
        } else {  // dafault: json format
            news = items.map(data => {
                let item = {};
                item['title'] = data.title._text.replace(/[|()]/g, '');
                item['link'] = data.link._text;
                return item;
            });
        }
    } else {
        if (outputFormat == 'mrkdwn') {
            news = '';
        } else {  // dafault: json format
            news = [];
        }
    }
    if (outputFormat == 'mrkdwn') {
        console.log(news);
    } else {  // dafault: json format
        console.log(JSON.stringify(news));
    }
}).catch(function (error) {
    console.log(error);
})