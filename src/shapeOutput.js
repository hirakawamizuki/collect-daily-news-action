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
    return mrkdwn;
}
