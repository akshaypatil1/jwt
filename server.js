'use strict';

const restify = require('restify');
const jwt = require('jsonwebtoken');
const user = require('./routes/user');
const DEFAULT_PORT = 8080;
const server = restify.createServer({
	name: 'server',
	version: '1.0.0'
});


function corsHandler(req, res, next) {

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
	res.setHeader('Access-Control-Max-Age', '1000');
	
	return next();
}
function optionsRoute(req, res, next) {
	res.send(200);
	return next();
}
server.opts('/\.*/', corsHandler, optionsRoute);
server.use(restify.plugins.bodyParser());

/* Setting Global */
global.SuperSecRetKey = 'db44a86d5e096513f2fc30e11e29e4b8';
/*End */

/* Auth Routes */
/** verifyToken method - this method verifies token */
function verifyToken(req, res, next){
    
    //Request header with authorization key
    const bearerHeader = req.headers['authorization'];
    
    //Check if there is  a header
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        
        //Get Token arrray by spliting
        const bearerToken = bearer[1];
        req.token = bearerToken;
        //call next middleware
        next();
    }else{
        res.send(403);
    }
}

server.post('/api/signin', (req, res) => {
    const user = {
        id: 1,
        username: "username",
        email: "username@test.com"
    }
    jwt.sign({user},global.SuperSecRetKey, { expiresIn: 60 * 60 }, (err, token) => {
        res.json({token});
    });
});


/*================Route List==================== */
server.get('/api/users',verifyToken,user.get);
server.post('/api/users',verifyToken,user.post);
/*============================================== */

server.listen(DEFAULT_PORT, function(){
	console.log('SERVER STATED AT '+DEFAULT_PORT);
});