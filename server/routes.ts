import express from 'express'
import expresstest from './api/expresstest'

const router = express.Router()

// get
router.get('/expresstest', expresstest)

export default router
