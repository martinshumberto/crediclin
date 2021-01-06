import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ errors: ['O token de acesso não foi informado.'] })
  }

  const [, token] = authHeader.split(' ')

  try {
    // const decoded = promisify(jwt.verify)(token, process.env.ACCESS_TOKEN_SECRET)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
      if (err) {
        return res.status(400).send({ errors: ['Token expirado.'] })
      }
      req.userId = result.id
    })

    return next()
  } catch (err) {
    return res.status(401).json({ errors: ['O token de acesso informado está incorreto.'] })
  }
}
