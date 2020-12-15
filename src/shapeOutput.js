exports.toJson = (items) => {
    let json;
    if (Array.isArray(items)){
        json = items.map(data => {
            let item = {};
            item['title'] = data.title._text.replace(/[|()]/g, '');
            item['link'] = data.link._text;
            return item;
        });
    } else {
        json = [];
    }
    return json;
}

exports.toMrkdwn = (jsonArray) => {
    let mrkdwn;
    if (Array.isArray(jsonArray)) {
        const links = jsonArray.map(item => `<${item.link}|${item.title}>`);
        mrkdwn = links.join('\\n\\n')        
    } else {
        mrkdwn = "";
    }
    // return "<https://codezine.jp/article/detail/13341|「Kubernetes 1.20」がリリース、11の拡張機能が安定版へ、15の拡張機能がベータ版へ移行 - CodeZine（コードジン）>\\n\\n<https://www.jiji.com/jc/article?k=000003599.000005875&g=prt|セキュリティコンテストCTFの花形ジャンルpwnableの解説書！ 『解題pwnable セキュリティコンテストに挑戦しよう！』発行! 技術の泉シリーズ、12月の新刊 - 時事通信>\\n\\n<https://japan.techrepublic.com/article/35163707.htm|「Kubernetes」入門--大規模な展開に最適なコンテナーオーケストレーションシステム - TechRepublic Japan>";
    return mrkdwn;
}
