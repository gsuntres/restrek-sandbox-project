const express = require('express')
const router = express.Router()

router.post('/', function(req, res) {
  res.status(200).send(Object.assign(req.body, {id: 1}))
})

module.exports = router
