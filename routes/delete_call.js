const express = require('express')
const router = express.Router()

router.delete('/:id', function(req, res) {
  const id = req.params['id']
  res.status(204).end()
})

module.exports = router
