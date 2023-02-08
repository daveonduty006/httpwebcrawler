const { JSDOM } = require("jsdom");


const crawlPage = async (currentURL) => {
    console.log(`actively crawling: ${currentURL}`);
    try{
        const resp = await fetch(currentURL) // By default the Fetch API sends a Get http request
        if(resp.status > 399){  // http response status code 200=OK,300=Redirected,400=Client error,500=Server error 
            console.log(`error in fetch: status code ${resp.status} on page ${currentURL}`);
            return
        }
        const contentType = resp.headers.get('content-type');
        if(!contentType.includes('text/html')){
            console.log(`non html response: content type ${contentType} on page ${currentURL}`);
            return
        }
        console.log(await resp.text());
    }catch(err){
        console.log(`error in fetch: ${err.message} on page ${currentURL}`)
    }
}

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
    getURLsFromHTML,
    crawlPage
}