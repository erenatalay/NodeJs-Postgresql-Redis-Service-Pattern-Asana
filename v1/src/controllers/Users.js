const projectService = require("../services/Projects")

const httpStatus = require("http-status");
const { passwordToHash, generateAccessToken, generateRefreshToken } = require("../scripts/utils/helper");
const uuid = require("uuid");
const eventEmitter = require("../scripts/events/eventEmitter");
const path = require("path");
const Service = require("../services/Users")
const UserService = new Service();
const ProjectService = require("../services/Projects")
const ProjectServices = new ProjectService();

const index = (req, res) => {

    UserService.list().then(response => {
        res.status(httpStatus.OK).send(response)
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))


}

const login = (req, res) => {
    req.body.password = passwordToHash(req.body.password)
    UserService.read(req.body).then(user => {
            if (!user) {
                return res.status(httpStatus.NOT_FOUND).send({ message: "Böyle bir kullanıcı bulunmamaktadır." })
            }
            user = {
                ...user,
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
    UserService.insert(req.body).then((response) => {
        res.status(httpStatus.CREATED).send(response);
    }).catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
    })

}

const projectList = (req, res) => {
    ProjectServices.list({ user_id: req.user.id }).then(projects => {
        res.status(httpStatus.OK).send(projects);
    }).catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: "Projeleri getiririken belirlenmedik bir hata oluştu."
    }))
}

const resetPassword = (req, res) => {
    const new_password = uuid.v4()?.split("-")[0] || `usr-${new Date().getTime()}`
    UserService.modify({ email: req.body.email }, { password: passwordToHash(new_password) })
        .then((updatedUser) => {
            if (!updatedUser) return res.status(httpStatus.NOT_FOUND).send({ error: "Böyle bir kullanıcı bulunulmamaktadır." })
            eventEmitter.emit("send_email", {
                to: updatedUser[1].email,
                subject: "Password Reset",
                html: `<b>Talebiniz üzerine şifre sıfırlama işleminiz gerçekleşmiştir  <br /> Giriş yaptıktan sonra şifrenizi değiştirmeyi unutmayınız. <br/> Yeni Şifreniz : ${new_password}</b>`,
            })

            res.status(httpStatus.OK).send({
                message: "Şifre sıfırlama işlemi için sisteme kayıtlı e posta adresinize gereken bilgiler gönderilmiştir."
            })
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Şifre resetleme sırasında bir problem oluştu." }))
}

const update = (req, res) => {
    UserService.modify({ id: parseInt(req.user?.id) }, req.body).then(updatedUser => {
        res.status(httpStatus.OK).send(updatedUser);
    }).catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Güncelleme işlemi sırasında bir problem oluştu." }))
}

const deleteUser = (req, res) => {
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "Id Bilgisi Eksik."
        })
    }

    UserService.remove(parseInt(req.params?.id))
        .then((deleteUsers) => {
            if (!deleteUsers) {
                return res.status(httpStatus.NOT_FOUND).send({
                    message: "Böyle bir kayıt bulunmamaktadır."
                })
            }
            res.status(httpStatus.OK).send({ message: "Kullanıcı silinmiştir" })

        }).catch(e =>{ 
            console.log(e)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Kayıt silme sırasında bir problem oluştu" })
        })
}

const changePassword = (req, res) => {
    req.body.password = passwordToHash(req.body?.password)
    UserService.modify({ id: req.user?.id }, req.body).then(updatedUser => {
        res.status(httpStatus.OK).send(updatedUser);
    }).catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Güncelleme işlemi sırasında bir problem oluştu." }))
}

const updateProfileImage = (req, res) => {
    if (!req?.files?.profile_image) {
        return res.status(httpStatus.BAD_REQUEST).send({ error: "Bu işlemi yapabilmek için yeterli veriye sahip değilsin" })
    }
    const extension = path.extname(req.files.profile_image.name)
    const fileName = `${req?.user?.full_name.toLowerCase().split(" ")[0]}${req?.user?.id}${extension}`;
    const folderPath = path.join(__dirname, "../", "uploads/users", fileName);
    req.files?.profile_image.mv(folderPath, function (err) {
        if (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err })
        }
        UserService.modify({ id: parseInt(req.user.id) }, { profile_image: fileName }).then(updatedUser => {
            res.status(httpStatus.OK).send(updatedUser);
        }).catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Upload  başarılı fakat kayıt sırasında bir problem oluştu." }))
    });


}

module.exports = {
    create,
    index,
    login,
    projectList,
    resetPassword,
    update,
    deleteUser,
    changePassword,
    updateProfileImage
}