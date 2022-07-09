
const prismaLog = (BaseModel,logger) => {
    BaseModel.$use(async (params, next) => {
        const result = await next(params)
        logger.log({
            level: "info",
            message: result
          })

        return result
      })
} 


module.exports = prismaLog;