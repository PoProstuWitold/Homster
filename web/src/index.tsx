/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import App from './App'
import { themeChange } from 'theme-change'

themeChange()
render(() => <App />, document.getElementById('root') as HTMLElement)
