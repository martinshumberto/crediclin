import app from 'index'

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`API server listening on port ${port}`)
})
