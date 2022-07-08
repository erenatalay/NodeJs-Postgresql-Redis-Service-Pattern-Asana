const BaseService = require("./BaseService");
const { PrismaClient } = require('@prisma/client');
const BaseModel = new PrismaClient();
const logger = require("../scripts/logger/Section")

  BaseModel.$use(async (params, next) => {
    const result = await next(params)
    logger.log({
        level: "info",
        message: params?.args?.data
      })
    return result
  })
  
class SectionService extends BaseService {
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

module.exports = new SectionService();