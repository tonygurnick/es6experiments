

    "use strict";

var redis = require("redis"),
    client = redis.createClient();



    function *GetRedisString(cb){
        this.value = yield this.getStringFromServer();
    }

    GetRedisString.prototype.getStringFromServer = function(){
        var self = this;
        client.get("qwerty", function( err, val ){
            self.next(val);
            client.quit();
        });
    };

    GetRedisString.prototype.wait = function( name ){
        this.next();


        return this;
    };
    var gen = new GetRedisString(function(){

        console.log("internal:",this.value,this)

    });


    console.log(  gen.wait() )
    console.log("...",gen)
// proof that value is availible but after the call returns
//    Object.observe(gen, function(changes) {
//        changes.forEach(function(change, i) {
//            console.log(change);
//            /*
//                What property changed? change.name
//                How did it change? change.type
//                Whats the current value? change.object[change.name]
//            */
//
//            gen[change.name] = change.object[ change.name ];
//        });
//    });

    client.set("qwerty", "this is spinal tap",function(){

     //    gen.next();


    });

