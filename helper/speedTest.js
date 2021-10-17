const random = require("./random")

/**
 * @description class to get pin download and upload sped and will return float
 * @method pin
 * @method download_speed
 * @method upload_speed
 */
module.exports = class SpeedTest {
    
    pin(){ //get pin result
        return new Promise((resolve) => { //create new promise
            const pin  = random.float();
            resolve(pin)
        })
    }

    download_speed(){ // get download speed
        return new Promise((resolve) => {
            const download  = random.float();
            resolve(download)
        })
    }

    upload_speed(){ //get upload speed
        return new Promise((resolve) => {
            const upload  = random.float();
            resolve(upload)
        })
    }
}