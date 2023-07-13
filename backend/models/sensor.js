const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const ObjectId = Schema.ObjectId

const Sensor = new Schema(
  // id: ObjectId,
  {
    date: { type: Date },
    humidity: { type: Number, default: 0 },
    temperature: { type: Number, default: 0 },
  },
)


module.exports = mongoose.model('sensors', Sensor)
//export default mongoose.model('sensors', Sensor)
