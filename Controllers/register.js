const handleRegister = (bcrypt, db) => async (req, res) => {
  const { email, name, password } = req.body

  if (!email || !name || !password) {
    return res.status('400').json('incorrect form')
  }
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(password, salt)

  await db.transaction(async (trx) => {
    try {
      const loginEmail = await trx('login')
        .insert({ hash, email }, 'email')
        .transacting(trx)
      const user = await trx('users').insert(
        { email: loginEmail[0], name: name, joined: new Date() },
        ['*']
      )
      res.json(user[0])
    } catch (er) {
      res.status('400').json('unable to register')
    }
  })
}

module.exports = {
  handleRegister
}
