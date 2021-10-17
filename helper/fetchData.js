/**
 * @description fetching data from database by date and will return average data or array of all row
 * @param type
 * @param date
 * @param model
 * @param field
 */
exports.Fetch = (type, date, model, field) => {
    const start = new Date(date);
    start.setHours(0,0,0,0);
    const end = new Date(date);
    end.setHours(23,59,59,999);
    if(type === 'average'){
        try {
            return new Promise((resolve, reject) => {
                model.aggregate(
                    [
                        {
                            $match:{
                                "createdAt": {$gte: start, $lte: end},
                            }
                        },
                        {
                            $group:{
                                _id: null,
                                average : {$avg: `$${field}`},
                                sun:{$sum: `$${field}`},
                                count: {$sum: 1},
                            }
                        }
                    ], function(err, data){
                        if(err){
                            console.log(err);
                            reject(err)
                        }else{
                            resolve(data);
                        }
                    }
                )
            })
        } catch (error) {
            console.log(err);
            reject(err)
        }
        
    }else if(type === 'normal'){
        try {
            return new Promise((resolve, reject) => {
                model.find({
                    createdAt: {
                        $gte:start,
                        $lte: end,
                    }
                }).distinct(field).exec((error, data) => {
                    if(error){
                        console.log(error);
                        reject(error);
                    };
            
                    if (data) {
                        resolve(data);
                    }
                })
            })
        } catch (error) {
            console.log(error);
            reject(error);
        }
        
    }
}