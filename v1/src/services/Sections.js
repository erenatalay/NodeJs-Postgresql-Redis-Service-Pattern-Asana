const BaseService = require("./BaseService");
const { PrismaClient } = require('@prisma/client');
const BaseModel = new PrismaClient();

class Users extends BaseService {
    constructor(){
        super(BaseModel.section)
    }

     list (where) {

        if (where) {
            return BaseModel.section.findMany({
                where,
                include: {
                    user: true,
                    project: true
                } 
            });
        }
        return BaseModel.section.findMany({
            include: {
                user: true,
                project: true
            }
        });
    }

}

module.exports = Users;