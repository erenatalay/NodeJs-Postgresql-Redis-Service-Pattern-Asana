const redisClient = require("../scripts/cache")

const cacheData = (key, cb) => {

    return new Promise(async (resolve, reject) => {
        let data = await redisClient.get(key)
        if (data != null) {
            console.log("hit data")
            return resolve(JSON.parse(data))
        }
        console.log("miss data")

        const freshData = await cb()

        redisClient.setEx(key, 3600, JSON.stringify(freshData))
        resolve(freshData)
    })
}

module.exports = cacheData;



