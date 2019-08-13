'use strict';

const jwt = require('jsonwebtoken');
const response = require('../helpers/response');

function UserController(){
    let self = this;
    self.store = [];

    this.get = function(req,res,next){
        jwt.verify(req.token, global.SuperSecRetKey, (err, authData)=>{
            if(err){
                response.sendError(res,403,err,next);
            }else{
                response.sendResult(res,200,self.store,next);
            }
        });
    };

    this.post = function(req,res,next){
        jwt.verify(req.token, global.SuperSecRetKey, (err, authData)=>{
            if(!req.body.hasOwnProperty('name')){
                response.sendError(res,500,'Field missing',next);
            }else{
                let index = self.store.length + 1;
                let dataObject = {
                    id : parseInt(index),
                    name : req.body.name
                };
                self.store.push(dataObject);
                response.sendResult(res,201,dataObject,next);
            }
        });
    };

};

module.exports = new UserController();