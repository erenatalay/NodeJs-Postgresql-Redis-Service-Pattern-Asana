const BaseService = require("./BaseService");
const { PrismaClient } = require('@prisma/client');
const BaseModel = new PrismaClient();

class Comment extends BaseService {
    constructor(){
        super(BaseModel.comments)
    }

     list (where) {
        if (where) {
            return BaseModel.comments({
                where,
                include: {
                    user: true,
                    task: true
    
                },
            });
        }
        return BaseModel.comments({
            include: {
                user: true,
                task: true
            },
        });
    }
}

module.exports = Comment;