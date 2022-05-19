const BaseService = require("./BaseService");
const { PrismaClient } = require('@prisma/client');
const BaseModel = new PrismaClient();
class Project extends BaseService {
    constructor(){
        super(BaseModel.project);
    }
}

module.exports = Project;