var express = require('express');

const SensorCtrl = require('../controllers/sensor-ctrl')

var router = express.Router();

/* GET home page. */
router.get('/api', function(req, res, next) {
  res.json({ message: 'Hello World!' });
});

router.post('/sensor', SensorCtrl.CreateSensor)
router.put('/sensor/:id', SensorCtrl.UpdateSensor)
router.delete('/sensor/:id', SensorCtrl.DeleteSensor)
router.get('/sensor/:id', SensorCtrl.GetSensorById)
router.get('/sensors', SensorCtrl.GetSensors)

module.exports = router;
