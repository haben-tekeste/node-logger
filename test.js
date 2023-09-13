import {Logger, LogConfig} from "./index.js"
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

async function initialize_logger(){
    let logger = Logger.with_config(LogConfig.from_file(path.join(__dirname,"./config.json")))
    await logger.init()
    return logger
}

async function main() {
    let logger = await initialize_logger()
    logger.critical('From the main() function')
    nested_func(logger)
    }
    function nested_func(logger) {
    logger.critical('From the nested_func() function')
    super_nested(logger)
    }
    function super_nested(logger) {
    logger.critical('From the super_nested() function')
    }
    main()