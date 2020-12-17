exports.toJson = (news) => {
    if (Array.isArray(news)){
        return news.map(data => {
            let item = {};
            item['title'] = data.title._text.replace(/[|()]/g, '');
            item['link'] = data.link._text;
            return item;
        });
    } else if (news) { // Not array but a single object
        let item = {};
        item['title'] = news.title._text.replace(/[|()]/g, '');
        item['link'] = news.link._text;
        return item;
    } else {
        return [];
    }
}

exports.toMrkdwn = (json) => {
    if (Array.isArray(json)) {
        const links = json.map(item => `<${item.link}|${item.title}>`);
        return links.join('\\n\\n')
    } else if (json) { // Not array but a single object
        return `<${json.link}|${json.title}>`;
    } else {
        return "";
    }
}
