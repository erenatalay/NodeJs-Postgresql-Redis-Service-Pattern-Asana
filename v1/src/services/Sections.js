
const { Projects } = require("../models");
const { Users } = require("../models");
const { Section } = require("../models");

const insert = (data) => {
    const section = new Section(data)

    return section.save();

}

const list = (where) => {
    if (where) {
        return Section.findAll({
            where,
            include: "User"
        });
    }
    return Section.findAll({
        include: ["Project","User"]
    });
}

const modify = (data, id) => {
    return Section.update(data, { where: { id }, returning: true, plain: true })

}


const remove = (id) => {
    return Section.destroy({ where: { id }})

}
module.exports = {
    insert,
    list,
    modify,
    remove
}