const mongoose = require("mongoose")

const citiesModel = mongoose.model("cities",{
    id: {type: Number},
    city: {type: String},
    ctrid: {type: Number}
})

module.exports = citiesModel;
