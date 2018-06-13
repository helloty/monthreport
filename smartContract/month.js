"use strict";

var MonthReportItem = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.key = obj.key;
        this.content = obj.content;
        this.name = obj.name;
        this.time = obj.time;
        this.ratio = obj.ratio;
        this.date=obj.date;
    } else {
        this.key = "";
        this.content = "";
        this.name = "";
        this.time = "";
        this.ratio = "";
        this.date="";
    }
};
MonthReportItem.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};
var MonthReport = function () {
    LocalContractStorage.defineMapProperty(this, "repo", {
        parse: function (text) {
            return new MonthReportItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

MonthReport.prototype = {
    init: function () {
        // init
    },
    save: function (name, content, ratio, time,date) {
        var from = Blockchain.transaction.from;
        var monthReportItem = this.repo.get(from);
        if (monthReportItem) {
            monthReportItem.name = JSON.parse(monthReportItem).name + '|-' + name;
            monthReportItem.content = JSON.parse(monthReportItem).content + '|-' + content;
            monthReportItem.ratio = JSON.parse(monthReportItem).ratio + '|-' + ratio;
            monthReportItem.time = JSON.parse(monthReportItem).time + '|-' + time;
            monthReportItem.date = JSON.parse(monthReportItem).date + '|-' + date;
            this.repo.put(from, monthReportItem);

        } else {
            monthReportItem = new MonthReportItem();
            monthReportItem.key = from;
            monthReportItem.content = content;
            monthReportItem.name = name;
            monthReportItem.time = time;
            monthReportItem.ratio = ratio;
            monthReportItem.date=date;
            this.repo.put(from, monthReportItem);
        }
    },
    get: function (key) {
        var from = Blockchain.transaction.from;
        return this.repo.get(from);
    }
};
module.exports = MonthReport;