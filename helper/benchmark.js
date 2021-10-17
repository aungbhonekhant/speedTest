const SpeedTest = require("./speedTest")
const DailyLog = require('../models/dailyLogs');
const { Fetch } = require("./fetchData");

/**
 * @method hourly
 * @method pin_average
 * @method download_average
 * @method upload_average
 * @method pin
 * @method download
 * @method upload
 * */
module.exports = class Benchmark {

    /**
     * @deprecated logs pin,download,upload to db 
     */ 
    async hourly(){
        const speedTest =  new SpeedTest();
        const pin  = await speedTest.pin(); //getting pin
        const download = await speedTest.download_speed(); //getting download speed
        const upload = await speedTest.upload_speed(); //getting upload speed

        if(pin !== null && download !==null && upload !== null) {
            const Daily = new DailyLog({pin, download, upload});
            try {
                const data = await Daily.save();
                console.log(data);
            }catch(err) {
                console.log(err)
            }
            
        }
            
    }

    /**
     * @deprecated get average pin by date
     * @param date 
     */ 
    async pin_average(date){ 
        const data = await Fetch("average",date, DailyLog , "pin"); //fetching data from database
        if(data.length !== 0){
            return parseFloat(data[0].average.toFixed(2));
        } 
    }

    /**
     * @deprecated get average download speed by date
     * @param date 
     */ 
    async download_average(date){
        const data = await Fetch("average",date, DailyLog , "download"); //fetching data from database
        if(data.length !== 0){
            return parseFloat(data[0].average.toFixed(2));
        } 
    }

    /**
     * @deprecated get average upload speed by date
     * @param date 
     */ 
    async upload_average(date){
        const data = await Fetch("average",date, DailyLog , "upload"); //fetching data from database
        if(data.length !== 0){
            return parseFloat(data[0].average.toFixed(2));
        } 
    }

    /**
     * @deprecated get all pin data by date
     * @param date 
     */ 
    async pin(date){
        const pin = await Fetch("normal",date, DailyLog , "pin"); //fetching data from database
        if(pin.length !== 0){
            return pin;
        }
    }

    /**
     * @deprecated get all download speed data by date
     * @param date 
     */ 
    async download(date){
        const download = await Fetch("normal",date, DailyLog , "download"); //fetching data from database
        if(download.length !== 0){
            return download;
        }
    }

    /**
     * @deprecated get all upload speed data by date
     * @param date 
     */ 
    async upload(date){ 
        const upload = await Fetch("normal",date, DailyLog , "upload"); //fetching data from database
        if(upload.length !== 0){
            return upload;
        }
    }
}