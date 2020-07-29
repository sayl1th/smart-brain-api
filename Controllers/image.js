const handleImage = () => async (req, res) => {
  const { id } = req.body
  try {
    const entries = await db('users')
      .where('id', '=', id)
      .increment('entries', 1)
      .returning('entries')
    res.json(entries[0])
  } catch {
    res.status('400').json('enable to get entries:')
  }
}

module.exports = {
  handleImage
}
