import express from 'express'
import expresstest from './api/expresstest'
import ping from './api/ping'
const router = express.Router()

// get
router.get('/expresstest', expresstest)
router.get('/ping', ping)

export default router
