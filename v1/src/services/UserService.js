const BaseService = require("./BaseService");
const { PrismaClient } = require('@prisma/client');
const BaseModel = new PrismaClient();

class UserService extends BaseService {
    constructor(){
        super(BaseModel.user)
    }

}

module.exports = new UserService();