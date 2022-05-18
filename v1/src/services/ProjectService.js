const BaseService = require("./BaseService");
const { PrismaClient } = require('@prisma/client');
const BaseModel = new PrismaClient();
class ProjectService extends BaseService {
    constructor(){
        super(BaseModel.project);
    }
}

module.exports = ProjectService;