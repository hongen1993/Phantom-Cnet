const router = require('express').Router()

const { newTaskcard, getTaskcards } = require('../controller/taskcard.controller')

router.get('/', getTaskcards)
router.post('/create', newTaskcard)

module.exports = router