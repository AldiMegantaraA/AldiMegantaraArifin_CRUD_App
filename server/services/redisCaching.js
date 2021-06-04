const mongoose = require('mongoose');
const redis = require('redis')
const util = require('util')

const redisUrl = 'redis://127.0.0.1:3000';
const client = redis.createClient(redisUrl);
// client get does not support promises. this is a way to promisify them
const exec = mongoose.Query.prototype.exec 
client.hget = util.promisify(client.hget);

mongoose.Query.prototype.exec = async function(){ 
    if(!this.useCache){
        return exec.apply(this, arguments)
    }
    let key = JSON.stringify(Object.assign({},this.getQuery(),{collection: this.mongooseCollection.name}));

    /* Querying the cache */
    const cacheValue = await client.hget(this.hashkey, key)
    
    // When data is found in redis cache
    if(cacheValue){
        const doc = JSON.parse(cacheValue)  
        return  Array.isArray(doc)
                ? doc.map((d)=>new this.model(d))
                : new this.model(doc);
    }

    const result = await exec.apply(this, arguments)
    if(result){ 
        if(Array.isArray(result) && result.length==0){
            // array is empty
            return null
        }
        else{
            // data is not empty
            client.hset(this.hashkey, key, JSON.stringify(result)); // saving data in redis cache
            return result
        }
    }else{ 
        console.log("data not present")
        return null
    } 
}

module.exports =  function clearCache(hashkey){
    client.del(JSON.stringify(hashkey))
}