import { ObjectId } from 'mongoose';
// init
import mysql from 'mysql2';
import util from 'util';
import config from 'config';
import mongoose from './db/mongo';
import getModel from './models/user-symbol/factory';
import getSymbolValueModel from './models/symbol-value/factory';
import axios from 'axios'
import cheerio  from 'cheerio';

// connect mysql
// mysql init
const connection = mysql.createConnection(config.get('mysql'));
const connect = util.promisify(connection.connect).bind(connection);
const query = util.promisify(connection.query).bind(connection);


// monogo init
const host = config.get<string>('mongo.host')
const port = config.get<number>('mongo.port')
const database = config.get<string>('mongo.database')



// connect mongo

// function scrape
// fetch data from google
// save in mongo
// notify clients

async function scrape(symbol: string)
{
    console.log(`scraping ${symbol}`)
    const response = await axios(`https://www.google.com/finance/quote/${symbol}-USD`);
    const html = response.data;
    const $ = cheerio.load(html);

    const value = parseFloat($('.YMlKec.fxKbKc').text().replace(',', ''));

    await getSymbolValueModel().add({
        symbol,
        value,
        when: new Date()
    })

    return value;

}

//loop
// get symbols from mysql
// scrape all symbols
// set timeout for next cycle

async function work()
{
    try{
        const symbols = await getModel().getUniqueSymbols();
        const results = await Promise.allSettled(symbols.map(scrape));
        console.log(results)
    }
    catch(err){
        console.log(err);
    }
    finally{
        setTimeout(work, config.get<number>('worker.interval'));        
    }
}

(async () => {
    await Promise.all([
        connect(),
        mongoose.connect(`mongodb://${host}:${port}/${database}`)
    ])
    work();
})();
