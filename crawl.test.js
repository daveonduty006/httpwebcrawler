const { normalizeURL } = require("./crawl");
const { test, expect } = require("@jest/globals");

// this test is expecting the actual output of the normalizeURL function to equal 
// the expected output specified.
// If they do equal each other Jest will log it as a passed test.
// Else if they differ from each other Jest will log it as a failed test.
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

