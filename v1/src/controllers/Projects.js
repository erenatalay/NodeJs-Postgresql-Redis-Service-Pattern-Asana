const httpStatus = require("http-status");
const ProjectService = require("../services/ProjectService")
const ApiError = require("../errors/ApiError")

class Projects {
    index(req, res) {
        ProjectService.list()
            .then(response => {
                res.status(httpStatus.OK).send(response)
            }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))


    }

    findById(req, res) {
        ProjectService.read({ id: parseInt(req.params.id) })
            .then(response => {
                res.status(httpStatus.OK).send(response)
            }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))


    }

    create(req, res) {
        req.body.user_id = req.user.id;
        ProjectService.insert(req.body).then((response) => {
            res.status(httpStatus.CREATED).send(response);
        }).catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })

    }

    update(req, res, next) {

        if (!req.params.id) {
            return res.status(httpStatus.BAD_REQUEST).send({
                message: "Id Bilgisi Eksik."
            })
        }

        ProjectService.modify(req.body, parseInt(req.params.id))
            .then((updatedProject) => {
           
                res.status(httpStatus.OK).send(updatedProject)


            }).catch(e => {
                return next(new ApiError("Böyle bir kayıt bulunmamaktadır", 404))
            })
    }


    deletedProject(req, res) {
        if (!req.params.id) {
            return res.status(httpStatus.BAD_REQUEST).send({
                message: "Id Bilgisi Eksik."
            })
        }

        ProjectService.remove(parseInt(req.params.id))
            .then((deletedProject) => {
                if (!deletedProject) {
                    return res.status(httpStatus.NOT_FOUND).send({
                        message: "Böyle bir kayıt bulunmamaktadır."
                    })
                }
                res.status(httpStatus.OK).send({ message: "Proje silinmiştir" })

            }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Kayıt silme sırasında bir problem oluştu" }))

    }

}


module.exports = new Projects()