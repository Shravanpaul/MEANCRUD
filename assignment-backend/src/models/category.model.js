
const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const uuid = require('uuid')

const { Schema } = mongoose

const CategorySchema = new Schema({
    categoryName: { type: String, required: false },
    isDeleted: {type: Boolean, default: false},
    categoryId: {
        type: String,
        default: function genUUID() {
            return uuid.v4().replace(/-/g, '')
        },
    },
})

CategorySchema.plugin(timestamps)

CategorySchema.index({ categoryId: 1 }, { unique: true })

module.exports = mongoose.model('category', CategorySchema)
