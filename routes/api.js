// importing libraries and dependencies
var Router = require("express").Router;
const apiController = require("../controller/api");
// const jsonWebTokenService = require("../services/jsonWebTokenService");

/**
 * Handles routing of all api request
 */
class Api {
    // webTokenObj = new jsonWebTokenService.JsonWebToken();
    constructor() {
        this.router = Router();
        this.init();
    }
    init() {
        this.router.get("/", apiController.welcomeApi);
        this.router.post("/login", apiController.login);
        this.router.patch("/applyjsonpatch", apiController.verifyToken, apiController.applyJsonPatch);
        this.router.post("/createthumbnail", apiController.verifyToken, apiController.createThumbnail);
    }
}

const apiRoutes = new Api();
module.exports = apiRoutes;
