const { insert, list, modify, remove } = require("../services/Sections")
const httpStatus = require("http-status");
const index = (req, res) => {
    if (!req.params.projectId ) {
        return res.status(httpStatus.BAD_REQUEST).send({ error: "Proje Bilgisi eksik" });
    }
    list({ project_id: req.params.projectId })
        .then(response => {
            if (response.length === 0) {
                return res.status(httpStatus.NOT_FOUND).send({ error: "Seçtiğiniz veride herhangi bir veri bulunamaktadır" });
            }
            res.status(httpStatus.OK).send(response)
        }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))


}
const create = (req, res) => {
    req.body.user_id = req.user.id;
    insert(req.body).then((response) => {
        res.status(httpStatus.CREATED).send(response);
    }).catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
    })

}

const update = (req, res) => {

    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "Id Bilgisi Eksik."
        })
    }

    modify(req.body, req.params?.id)
        .then((updatedProject) => {
            res.status(httpStatus.OK).send(updatedProject[1])

        }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Kayıt sırasında bir problem oluştu" }))
}


const deletedSection = (req, res) => {
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "Id Bilgisi Eksik."
        })
    }

    remove(req.params?.id)
        .then((deletedProject) => {
            if (!deletedProject) {
                return res.status(httpStatus.NOT_FOUND).send({
                    message: "Böyle bir kayıt bulunmamaktadır."
                })
            }
            res.status(httpStatus.OK).send({ message: "Proje silinmiştir" })

        }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Kayıt silme sırasında bir problem oluştu" }))

}

module.exports = {
    create,
    index,
    update,
    deletedSection
}