const mongoose = require("mongoose")

const calcSchema = new mongoose.Schema({
    weight: {
        type: Number,
        required: true
      },
      height: {
        type: Number,
        required: true
      },
      bmi: {
        type: Number
      }
    // userID : String,
})

const BMI = mongoose.model("bmi", calcSchema)

module.exports = {
    BMI
}