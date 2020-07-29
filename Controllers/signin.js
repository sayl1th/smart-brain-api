const handleSignin = (bcrypt, db) => async (req, res) => {
  const { email, password } = req.body

  try {
    const data = await db
      .select('email', 'hash')
      .from('login')
      .where('email', '=', req.body.email)
    const isValid = bcrypt.compareSync(password, data[0].hash)

    if (isValid) {
      try {
        const user = await db
          .select('*')
          .from('users')
          .where('email', '=', email)
        res.json(user[0])
      } catch {
        res.status('400').json('unable to get the user')
      }
    } else res.status('400').json('wrong credentials')
  } catch {
    res.status('400').json('wrong credentials')
  }
}

module.exports = {
  handleSignin
}
