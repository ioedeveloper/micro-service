const jwt = require("jsonwebtoken");
const jsonPatch = require("json-patch");
const jimp = require("jimp");
const imageDownloader = require('image-downloader');


const welcomeApi = (req, res) => {
    let viewresult = {
        message:"Welcome To My App"
    };
    return res.status(200).json(viewresult);
};

const login = (req, res) => {
    // map test user to view model
    let user = {
        username: req.body.username,
        password: req.body.password
    }
    jwt.sign({user}, "hackerbay", (err, token) => {
        if(err){
            let viewresult = {
                error:err
            };
            return res.status(200).json(viewresult);
        }else{
            let viewresult = {
                token:token
            };
            return res.status(200).json(viewresult);
        }
    });
};

const verifyToken = (req, res, next) => {
    //get to from headers['authorization']
    const bearerHeader = req.headers['authorization'];
    if(typeof  bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.body.token = bearerToken;
        jwt.verify(req.body.token, "hackerbay", (err, authData) =>{
            if(err){
                return res.status(403).send("Access Denied!");
            }else{
                next();
            }
        });
    }else{
        // forbidden
        return res.status(403).send("Access Denied!");
    }
}

const applyJsonPatch = (req, res) => {
    // console.log(req.body.token);
    if(typeof req.body.jsonobject !== "undefined" && typeof req.body.jsonpatchobject !== "undefined"){
        let jsonobject = req.body.jsonobject;
        let jsonpatchobject = req.body.jsonpatchobject;
        jsonPatch.apply(jsonobject, jsonpatchobject);
        let result = jsonPatch.compile(jsonpatchobject);
        return res.status(200).send(result);
    }else{
        return res.send("Invalid Body Parameters");
    }
};

const createThumbnail = async (req, res) => {
    if(typeof req.body.url !== "undefined"){
        let options = {
            url:req.body.url, 
            dest:"images"
        };
        try {
            // download image using image-downloader library
            const { filename, image } = await imageDownloader.image(options);
            try{    
                let destPath = options.dest+"/resize.jpg";
                    await jimp.read(filename).then((image)=>{
                    image.resize(50,50).write(destPath);
                });
                let viewresult = {
                    "thumbnail":destPath
                };
                return res.status(200).json(viewresult);
            }catch (e){
                let viewresult = {
                    error:"Image resize failed!"
                };
                return res.status(200).json(viewresult);
            }
        } catch (e) {
            let viewresult = {
                error:"Image download failed"
            };
            return res.status(200).json(viewresult);
        }
    }else{
        let viewresult = {
            error:"URL is not specified."
        };
        return res.status(200).json(viewresult);
    }
};

module.exports = {welcomeApi, login, verifyToken, applyJsonPatch, createThumbnail};