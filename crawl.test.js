const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

// These tests are expecting the actual output of the tested function to equal 
// an expected output.
// If they do equal each other Jest will log the test as passed.
// Else if they differ from each other Jest will log it as failed.

test('normalizeURL no protocol', () => {
    const input = 'https://blog.boot.dev/path';
    const actual_output = normalizeURL(input);
    const expected_output = 'blog.boot.dev/path';
    expect(actual_output).toEqual(expected_output);
})

test('normalizeURL no trailing slash', () => {
    const input = 'https://blog.boot.dev/path/';
    const actual_output = normalizeURL(input);
    const expected_output = 'blog.boot.dev/path';
    expect(actual_output).toEqual(expected_output);
})


test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path/">
                    Boot.dev Blog
                </a>
            </body>
        </html>
    `;
    const inputBaseUrl = "https://blog.boot.dev/path/"
    const actual_output = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
    const expected_output = ["https://blog.boot.dev/path/"];
    expect(actual_output).toEqual(expected_output);
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="/path/">
                    Boot.dev Blog
                </a>
            </body>
        </html>
    `;
    const inputBaseUrl = "https://blog.boot.dev"
    const actual_output = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
    const expected_output = ["https://blog.boot.dev/path/"];
    expect(actual_output).toEqual(expected_output);
})

test('getURLsFromHTML both absolute and relative', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path1/">
                    Boot.dev Blog Path One
                </a>
                <a href="/path2/">
                    Boot.dev Blog Path Two
                </a>                
            </body>
        </html>
    `;
    const inputBaseUrl = "https://blog.boot.dev"
    const actual_output = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
    const expected_output = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"];
    expect(actual_output).toEqual(expected_output);
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="invalid">
                    Invalid URL
                </a>
            </body>
        </html>
    `;
    const inputBaseUrl = "https://blog.boot.dev"
    const actual_output = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
    const expected_output = [];
    expect(actual_output).toEqual(expected_output);
})
