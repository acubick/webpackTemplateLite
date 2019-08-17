import './css/index.css'
import './scss/index.scss'
import './less/index.less'
import './modules/ts.module'
import AppService from './modules/app.service'
import { config } from './modules/config'


console.log('Config key:', config.key)

const service = new AppService('Hello worggggSS!')
service.log()
