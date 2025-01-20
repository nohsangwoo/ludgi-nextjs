import express from 'express'
import expresstest from './expresstest'
import ping from './ping'
const router = express.Router()

// get
router.get('/expresstest', expresstest)
router.get('/ping', ping)

export default router
