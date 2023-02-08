const { crawlPage } = require('./crawl.js');


const main = () => {
    // process.argv represents the command passed in the terminal.
    // for example, the command 'npm start http://wagslane.dev' will have 3 args:
    //  -arg1 = ...\nodejs\node.exe        <- represents the interpreter (javascript is an interpreted language)
    //  -arg2 = ...\httpwebcrawler\main.js <- the name of the file 
    //  -arg3 = wagslane.dev               <- the name of the website passed in 
    if(process.argv.length < 3){
        console.log("no website provided");
        process.exit(1);
    }
    if(process.argv.length > 3){
        console.log("too many command line args");
        process.exit(1);
    }
    const baseURL = process.argv[2];
    console.log(`starting crawl of ${baseURL}`);
    crawlPage(baseURL);
}

main();