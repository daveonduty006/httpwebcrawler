const printReport = (pages) => {
    console.log('==========');
    console.log('REPORT');
    console.log('==========');
    const sortedPages = sortPages(pages);
    for(const sortedPage of sortedPages){
        const url = sortedPage[0];
        const hits = sortedPage[1];
        console.log(`Found ${hits} links to page: ${url}`)
    }
    console.log('==========');
    console.log('END REPORT');
    console.log('==========');
}

const sortPages = (pages) => {
    const pagesArr = Object.entries(pages); // Object.entries() allows iterating through an object's attributes
                                            // by returning an array of arrays (key-values pair) of the attributes
    pagesArr.sort( (a,b) => {
        aHits = a[1];
        bHits = b[1];
        return b[1] - a[1]
    })
    return pagesArr
}


module.exports = {
    sortPages,
    printReport
}