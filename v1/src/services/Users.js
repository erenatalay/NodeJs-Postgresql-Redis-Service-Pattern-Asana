const BaseService = require("./BaseService");
const { PrismaClient } = require('@prisma/client');
const BaseModel = new PrismaClient();

class Users extends BaseService {
    constructor(){
        super(BaseModel.user)
    }

}

module.exports = Users;