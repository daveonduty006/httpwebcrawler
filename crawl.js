const { JSDOM } = require("jsdom");

const normalizeURL = (urlString) => {
    const urlObj = new URL(urlString); // URL API constructor lower case all characters
    const hostPath =  `${urlObj.hostname}${urlObj.pathname}`;
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

const getURLsFromHTML = (htmlBody, baseUrl) => {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.getElementsByTagName('a');
    for(const linkElement of linkElements){
        if(linkElement.href.slice(0, 1) === '/'){
            // relative
            try{ // need to handle expected error thrown by an invalid URL/link
                const urlObj = new URL(`${baseUrl}${linkElement.href}`);
                urls.push(urlObj.href); // .href attribute is the stringified link
            }catch(err){
                console.log(`error with relative url: ${err.message}`);
            }
        }else{
            // absolute
            try{ // need to handle expected error thrown by an invalid URL/link
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href); // .href attribute of URL object is the link stringified
            }catch(err){
                console.log(`error with absolute url: ${err.message}`);
            }
        }
    }
    return urls;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}