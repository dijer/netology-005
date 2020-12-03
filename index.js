#!/usr/bin/env node -r dotenv\config
const http = require('http');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers')

const args = yargs(hideBin(process.argv)).argv
const city = args.c || args.city;

const apiKey = process.env.apiKey;

const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

console.log(url);

http.get(url, (response) => {
    response.setEncoding('utf-8');

    let rawData = '';
    response.on('data', chunk => rawData += chunk);
    response.on('end', () => {
        let parseData = JSON.parse(rawData);
        console.log(parseData);
    });
}).on('error', (err) => {
    console.error(err);
});