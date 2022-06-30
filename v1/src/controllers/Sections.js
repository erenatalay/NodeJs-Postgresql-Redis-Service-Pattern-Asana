const httpStatus = require("http-status");
const SectionService = require("../services/SectionService")


class Sections {
    index(req, res) {
     
        SectionService.list({ project_id: parseInt(req.params.projectId) })
            .then(response => {
                if (response.length === 0) {
                    return res.status(httpStatus.NOT_FOUND).send({ error: "Seçtiğiniz veride herhangi bir veri bulunamaktadır" });
                }
                res.status(httpStatus.OK).send(response)
            }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))


    }
    create(req, res) {
        req.body.user_id = req.user.id;
        SectionService.insert(req.body).then((response) => {
            res.status(httpStatus.CREATED).send(response);
        }).catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })

    }

    update(req, res) {

     

        SectionService.modify(req.body, parseInt(req.params?.id))
            .then((updatedProject) => {
                res.status(httpStatus.OK).send(updatedProject)

            }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Kayıt sırasında bir problem oluştu" }))
    }


    deletedSection(req, res) {
     
        SectionService.remove(parseInt(req.params?.id))
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

module.exports = new Sections()



