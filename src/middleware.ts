import http from 'http'

export const validateToken = async (req: http.IncomingMessage, res: http.ServerResponse, next: () => void): Promise<void> => {
  const authHeader = req.headers['authorization']
  //req

  console.log(req.headers['authorization'])
  console.log("CIAO")
  next()

/*  if (!authHeader) {
    res.statusCode = 401
    res.setHeader('Content-Type', 'text/plain')
    res.end('Access Denied: No Token Provided!')
    return
  }

  const token = authHeader.split(' ')[1]

  if (token === 'apikey-dev') {
    next()
  } else {
    res.statusCode = 401
    res.setHeader('Content-Type', 'text/plain')
    res.end('Access Denied: Invalid Token!')
  }*/
}