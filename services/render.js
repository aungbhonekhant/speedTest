const SpeedTest = require('../helper/speedTest')
const Benchmark = require("../helper/benchmark");
const moment = require('moment');
const { Fetch } = require('../helper/fetchData');
const DailyLog = require('../models/dailyLogs');

module.exports = class services{

    /** 
    * @description home page and testing 
    * @render base.ejs file
    * @return title, pin, download, upload
    */
    async baseRoute(req, res){
        const speedTest = new SpeedTest();
        const pin  =  await speedTest.pin(); //pin
        const download = await speedTest.download_speed(); //download_speed
        const upload = await speedTest.upload_speed(); //upload_speed
        const today = moment(new Date()).format('YYYY-MM-DD');
        if(pin !== null && download !==null && upload !== null)
            res.render('base', {title:"SpeedTest", today, pin, download, upload})
        else
            console.log("Something wrong!")
    }


    /** 
    * @description show daily average and list of whole day testing data by choosing date
    * @render daily.ejs file
    * @return pin_list, download_list, upload_list, pin_average, download_average, upload_average
    */
    async dailyRoute(req, res){
        let date = "";
        if(req.params.date){
            date = req.params.date;
        }else{
            const now = new Date();
            date = moment(now).format('YYYY-MM-DD');
        }
        const benchmark = new Benchmark();
        const pin_avg = await benchmark.pin_average(date); //pin average
        const download_avg = await benchmark.download_average(date); //download average
        const upload_avg = await benchmark.upload_average(date); //upload average
        const pin = await benchmark.pin(date); //pin list by date
        const download = await benchmark.download(date); //download list by date
        const upload = await benchmark.upload(date); //upload list by date

        const date_label = await Fetch("normal",date, DailyLog , "createdAt"); // for chart label
        const labels = date_label.map(date =>{ return moment(date).format('hh:mm')})

        if(pin_avg && download_avg && upload_avg && pin && download && upload && labels){
            const data = {pin_avg , download_avg , upload_avg , pin , download , upload, labels};
            res.render('daily', {title: "Daily Test Benchmark", data});
        }else{
            const data = {pin_avg:'--' , download_avg:'--' , upload_avg:'--' , pin , download , upload, labels};
            res.render('daily', {title: "Daily Test Benchmark", data});
        }
    }
}