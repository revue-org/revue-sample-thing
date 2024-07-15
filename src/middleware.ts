export const validateToken = (req: any, res: any, next: any) => {
  //TODO TOKEN VALIDATION TO IMPROVE, NOT WORKING!!
  const token = req.headers['authorization']
  if (!token) {
    return res.status(401).send('Access Denied: No Token Provided!')
  }

  if (token === 'Bearer apikey-dev') {
    next()
  } else {
    res.status(401).send('Access Denied: Invalid Token!')
  }
}