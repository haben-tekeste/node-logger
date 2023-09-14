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
   setInterval(()=>{
    logger.critical("hi there")
   },1000)
    }
    main()