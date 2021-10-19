
const CategoryModel = require('../../../../models/category.model')


const findAndUpdate = async function (filter, categoryObject) {
    try {
        const dbResult = await CategoryModel.findOneAndUpdate(
            filter,
            categoryObject,
            { new: true, upsert: true}
        ).lean()
        return { value: dbResult }
    } catch (error) {
        return { error: new CustomError(error) }
    }
}

const create = async function (filter, categoryObject) {
    try {
        const dbResult = await CategoryModel.create(
            categoryObject
        )
        return { value: dbResult }
    } catch (error) {
        return { error: new CustomError(error) }
    }
}

const findOne = async function (filter) {
    try {
        const dbResult = await CategoryModel.findOne(filter).lean()
        return { value: dbResult }
    } catch (error) {
        return { error: new CustomError(error) }
    }
}

const find = async function (filter) {
    try {
        const dbResult = await CategoryModel.find(filter).lean()
        return { value: dbResult }
    } catch (error) {
        return { error: new CustomError(error) }
    }
}



module.exports = {
    findAndUpdate,
    findOne,
    find,
    create
}