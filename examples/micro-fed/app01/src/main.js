import { render as HeaderRender } from './header'
import { render as ContentRender } from './content'

const el = document.querySelector('#app')

HeaderRender(el)
ContentRender(el)
