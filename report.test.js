const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");


test('sortPages 2 pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3
    };
    const actual_output = sortPages(input);
    const expected_output = [
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]
    ];
    expect(actual_output).toEqual(expected_output);
})

test('sortPages 5 pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3,
        'https://wagslane.dev/path2': 5,
        'https://wagslane.dev/path3': 2,
        'https://wagslane.dev/path4': 9
    };
    const actual_output = sortPages(input);
    const expected_output = [
        ['https://wagslane.dev/path4', 9],
        ['https://wagslane.dev/path2', 5],
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path3', 2],
        ['https://wagslane.dev/path', 1]
    ];
    expect(actual_output).toEqual(expected_output);
})