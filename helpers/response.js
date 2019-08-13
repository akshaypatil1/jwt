function ResponseController(){
    this.sendError = function(objResponse,statusCode,error,next){
        objResponse.setHeader('content-type', 'application/json');
        objResponse.send(statusCode,
            {
                error:error
            }
        );
        return next();
    };

    this.sendResult = function(objResponse,statusCode,result,next){
        objResponse.setHeader('content-type', 'application/json');
        objResponse.send(statusCode,
            {
                data:result
            }
        );
        return next();
    };
}
module.exports = new ResponseController();