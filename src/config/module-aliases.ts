import { resolve, join } from 'path'
import { addAliases } from 'module-alias'

addAliases({
  '@': join(resolve(__dirname, '..', '..'), 'src')
})
