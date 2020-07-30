const Clarifai = require('clarifai')

const app = new Clarifai.App({
  apiKey: '84eb52d8efee46eab08f67225476977c'
})

const handleApiCall = () => async (req, res) => {
  try {
    const data = await app.models.predict(
      'c0c0ac362b03416da06ab3fa36fb58e3',
      req.body.input
    )
    res.json(data)
  } catch {
    res.status('400').json('unable to call api')
  }
}

const handleImage = (db) => async (req, res) => {
  const { id } = req.body
  try {
    const entries = await db('users')
      .where('id', '=', id)
      .increment('entries', 1)
      .returning('entries')
    res.json(entries[0])
  } catch {
    res.status('400').json('unable to get entries')
  }
}

module.exports = {
  handleImage,
  handleApiCall
}
