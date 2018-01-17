var async = require('async');

var consts = require('../const/const');
let uuidv4 = require('uuid/v4');
var fs = require("fs");

module.exports = {
    //marketsList
    marketsList: function (req, res) {
        var marketList = [];
        var market = {};
        // let sql = `SELECT * FROM ticker_info where name=?`;
        // let sql = `SELECT DISTINCT Name name FROM ticker_info where name=?`;
        // let sql = `SELECT * FROM ticker_info LIMIT 100`;
        // let sql = `SELECT name, avg(percent_change_24h) as percent_change_24h, avg(market_cap_usd) as market_cap_usd, avg(price_usd) as price_usd, avg(total_supply) as total_supply, avg(volume_usd_24h) as volume_usd_24h  FROM ticker_info group by name`;
        let sql = `select * from ticker_info group by rank order by rank limit 100`;
        
        let name = 'Bitcoin';
        db.all(sql, (err, rows) => {
            if (err) {
                res.send({ status: false, message: "Error while fetching record from DB", error: err })
            }
            async.every(rows, function (row, callback) {
                    market.id = row.ID;
                    market.currencyId = row.currency_id;
                    market.name = row.name;
                    market.symbol = row.symbol;
                    market.rank = row.rank;
                    market.priceUsd = row.price_usd;
                    market.priceBtc = row.price_btc;
                    market.volumeUsd24h = row.volume_usd_24h;
                    market.marketCapUsd = row.market_cap_usd;
                    market.availableSupply = row.available_supply;
                    market.totalSupply = row.total_supply;
                    market.percent_change_1h = row.percent_change_1h;
                    market.percent_change_24h = row.percent_change_24h;
                    market.percent_change_7d = row.percent_change_7d;
                    market.last_updated = row.last_updated;

                    // market.name = row.name;
                    // market.priceUsd = row.price_usd.toFixed(2);
                    // market.volumeUsd24h = row.volume_usd_24h.toFixed(2);
                    // market.marketCapUsd = row.market_cap_usd.toFixed(2);
                    // market.totalSupply = row.total_supply.toFixed(2);
                    // market.percent_change_24h = row.percent_change_24h.toFixed(2);
                    marketList.push(market);
                    market = {};
                    callback(null, !err)
            }, function (err, result) {
                if (err) {
                    console.log('Error while processing rows');
                    res.send({ status: false, message: "Error while mapping DB data to json", error: err })
                } else {
                    console.log('All record from DB have been processed successfully');
                    res.send({ status: true, message: "Record fetch successfully", count: marketList.length, marketList })
                }
            });          
        });
    },
    //marketsGraph
    marketsGraph: function (req, res) {
        let currency = req.params.currency;
        let type = req.params.type;
        let day = req.params.day;
        let startDate = req.params.endDate;
        let endDate = req.params.endDate;
        if(day == 1) {
            startDate = startDate - 86400;
        } else if(day == 7) {
            startDate = startDate - 604800;
        } else {
            startDate = startDate - 2592000;
        }
        var marketList = [];
        var market = {};
        let sql = `select * from ticker_info where name = ? and last_updated between ? and ?;`;
        let name = 'Bitcoin';
        db.all(sql, [currency, startDate, endDate], (err, rows) => {
            if (err) {
                res.send({ status: false, message: "marketsGraph: Error while fetching record from DB", error: err })
            }
            async.every(rows, function (row, callback) {
                    market.name = row.name;
                    if(type == "price_usd")
                        market.priceUsd = row.price_usd;
                    if(type == "volume_usd_24h")
                        market.volumeUsd24h = row.volume_usd_24h;
                    if(type == "market_cap_usd")
                        market.marketCapUsd = row.market_cap_usd;
                    marketList.push(market);
                    market = {};
                    callback(null, !err)
            }, function (err, result) {
                if (err) {
                    console.log('marketsGraph: Error while processing rows');
                    res.send({ status: false, message: "marketsGraph: Error while mapping DB data to json", error: err })
                } else {
                    console.log('All record based upon filter have been processed successfully');
                    res.send({ status: true, message: "Record fetch successfully", count: marketList.length, marketList })
                }
            });          
        });
    }
};