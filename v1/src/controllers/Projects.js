const httpStatus = require("http-status");
const ProjectService = require("../services/ProjectService")
const ApiError = require("../errors/ApiError");
const cacheData = require("../helpers/RedisEvent") ;


class Projects {

    async index(req, res) {
        const projects = await cacheData("projects", () => {
            return ProjectService.list().then(response => {
                return response
                
            }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))


        })

        res.status(httpStatus.OK).send(projects)

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


        ProjectService.modify(req.body, parseInt(req.params.id))
            .then((updatedProject) => {

                res.status(httpStatus.OK).send(updatedProject)
            }).catch(e => {
                return next(new ApiError("Böyle bir kayıt bulunmamaktadır", 404))
            })
    }


    deletedProject(req, res) {

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