const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const filmRouter = require('./filmRouter')
const categoryRouter = require('./categoryRouter')

router.use('/user',userRouter)
router.use('/film',filmRouter)
router.use('/category',categoryRouter)

module.exports = router