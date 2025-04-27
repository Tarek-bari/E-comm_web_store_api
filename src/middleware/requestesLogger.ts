import { Request, Response, NextFunction } from 'express'
const { logEvents } = require('../utils/logEvents')

export const requestsLogger = async (req: Request, res: Response, next: NextFunction) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'requestesLogs.log')
    next()
}


