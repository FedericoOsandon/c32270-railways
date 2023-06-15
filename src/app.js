const express = require('express' )
const mongoose = require('mongoose' )
const cookieParser = require('cookie-parser' )
const handlebars = require('express-handlebars')

const usersRouter = require('./routes/users.router.js' )
const petsRouter = require('./routes/pets.router.js' )
const adoptionsRouter = require('./routes/adoption.router.js' )
const sessionsRouter = require('./routes/sessions.router.js')

///Logger 
const { logger } = require('./config/logger.config.js')
const { addLogger } = require('./middlewars/logger.middleware.js')

// Swagger
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')
const { swaggerOptions } = require('./config/swagger.config.js')
const cors = require('cors')
require('dotenv').config()

const app = express() 
const PORT = process.env.PORT||8080 
const connection = mongoose.connect(process.env.MONGO_URL)

app.use(express.json())
app.use(cookieParser())
app.use(addLogger)
app.use(cors())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')


const specs = swaggerJsDoc(swaggerOptions)

app.get('/', (req, res)=>{
    res.render('index', {})
})
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use('/api/users',usersRouter) 
app.use('/api/pets',petsRouter) 
app.use('/api/adoptions',adoptionsRouter) 
app.use('/api/sessions',sessionsRouter) 

app.listen(PORT,()=> logger.info(`Listening on ${PORT}`) )

