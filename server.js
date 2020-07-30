const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const knex = require('knex')
const { handleRegister } = require('./Controllers/register.js')
const { handleSignin } = require('./Controllers/signin.js')
const { handleImage, handleApiCall } = require('./Controllers/image.js')

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'saylith',
    password: '',
    database: 'smart-brain'
  }
})

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
  try {
    const users = await db.select('*').from('users')
    res.json(users)
  } catch {
    res.status('400')
  }
})

app.post('/signin', handleSignin(bcrypt, db))
app.post('/register', handleRegister(bcrypt, db))
app.put('/image', handleImage(db))
app.post('/imageurl', handleApiCall())

app.listen(3000)
