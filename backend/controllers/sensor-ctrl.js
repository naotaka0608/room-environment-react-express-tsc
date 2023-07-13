const Sensor = require('../models/sensor')

const CreateSensor = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a sensor',
        })
    }
    
    const sensor = new Sensor(body)

    
    if (!sensor) {
        return res.status(400).json({ success: false, error: 'err' })
    }

    sensor
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: sensor._id,
                message: 'Sensor created!',
            })
        })
        .catch((error) => {
            return res.status(400).json({
                error,
                message: 'Sensor not created!',
            })
        })
    
}


const UpdateSensor = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Sensor.findOne({ _id: req.params.id }, (err, sensor) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Movie not found!',
            })
        }

        sensor.date = body.date
        sensor.humidity = body.humidity
        sensor.temperature = body.temperature
        sensor
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: sensor._id,
                    message: 'Sensor updated!',
                })
            })
            .catch((error) => {
                return res.status(404).json({
                    error,
                    message: 'Sensor not updated!',
                })
            })
    })
}

const DeleteSensor = async (req, res) => {
    await Sensor.findOneAndDelete({ _id: req.params.id }, (err, sensor) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!sensor) {
            return res
                .status(404)
                .json({ success: false, error: 'Sensor not found' })
        }

        return res.status(200).json({ success: true, data: sensor })
    }).catch((err) => console.log(err))
}

const GetSensorById = async (req, res) => {
    await Sensor.findOne({ _id: req.params.id }, (err, sensor) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: sensor })
    }).catch((err) => console.log(err))
}

const GetSensors = async (req, res) => {
    //res.set({ 'Access-Control-Allow-Origin': '*' }); // ここでヘッダーにアクセス許可の情報を追加
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001/api/sensors')
    await Sensor.find({}, (err, sensors) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!sensors.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Sensor not found' })
        }
        //return res.status(200).json({ data: sensors })
        return res.status(200).json({ success: true, data: sensors })
        //return res.status(200).json({ message: 'Hello World!' })
    }).catch((err) => console.log(err))
}

module.exports = {
    CreateSensor,
    UpdateSensor,
    DeleteSensor,
    GetSensors,
    GetSensorById,
}
