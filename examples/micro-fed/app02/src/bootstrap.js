import { render as ContentRender } from './content'
import { render as FooterRender } from './footer'
import { render as HeaderRender} from 'app01/Header'

const el = document.querySelector('#app')
HeaderRender(el)
ContentRender(el)
FooterRender(el)
