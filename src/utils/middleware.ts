import http from 'http'

export const validation = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  next: () => void
): Promise<void> => {
  //const authHeader = req.headers['authorization']
  next()
}
