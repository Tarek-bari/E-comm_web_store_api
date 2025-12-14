import { format } from 'date-fns'
import { existsSync, promises } from 'fs'
import { v4 as uuid } from 'uuid'
import { join } from 'path'


interface LogEvents {
    (message: string, logFile: string): Promise<void>;
}

export const logEvents: LogEvents = async (message, logFile) => {
    const dateTime = format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')
    const logMessage = `${dateTime}\t${uuid()}\t${message}`

    try {
        if (!existsSync(join(__dirname, '..', 'logs'))) {
            await promises.mkdir(join(__dirname, '..', 'logs'))
        }

        await promises.appendFile(join(__dirname, '..', 'logs', logFile), `\n${logMessage}`)

    } catch (err) {
        console.log(err)
    }
}




