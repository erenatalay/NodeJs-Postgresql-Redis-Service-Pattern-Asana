const { insert, list, loginUser, modify } = require("../services/Users")
const projectService = require("../services/Projects")

const httpStatus = require("http-status");
const { passwordToHash, generateAccessToken, generateRefreshToken } = require("../scripts/utils/helper");
const uuid = require("uuid")

const index = (req, res) => {

    list().then(response => {
        res.status(httpStatus.OK).send(response)
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))


}

const login = (req, res) => {
    req.body.password = passwordToHash(req.body.password)
    loginUser(req.body)
        .then(user => {
            if (!user) {
                return res.status(httpStatus.NOT_FOUND).send({ message: "Böyle bir kullanıcı bulunmamaktadır." })
            }
        

            user = {
                ...user.dataValues,
                tokens: {
                    access_token: generateAccessToken(user),
                    refresh_token: generateRefreshToken(user)
                }
            }
            res.status(httpStatus.OK).send(user)
        })

        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}
const create = (req, res) => {

    req.body.password = passwordToHash(req.body.password);

    insert(req.body).then((response) => {
        res.status(httpStatus.CREATED).send(response);
    }).catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
    })

}

const projectList = (req,res) => {
    projectService.list({user_id : req.user.id}).then(projects => {
        res.status(httpStatus.OK).send(projects);
    }).catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error : "Projeleri getiririken belirlenmedik bir hata oluştu."
    }))
}

const resetPassword = (req,res) => {
    const new_password = uuid.v4()?.split("-")[0] || `usr-${new Date().getTime()}`
    modify({email : req.body.email},{password : passwordToHash(new_password)})
    .then((updatedUser) => {
      if(!updatedUser) return res.status(httpStatus.NOT_FOUND).send({error  : "Böyle bir kullanıcı bulunulmamaktadır."})
      res.status(httpStatus.OK).send(updatedUser[1]);
    })
    .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error : "Şifre resetleme sırasında bir problem oluştu."}) )
}

module.exports = {
    create,
    index,
    login,
    projectList,
    resetPassword
}