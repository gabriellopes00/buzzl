import { resolve, join } from 'path'
import moduleAlias from 'module-alias'

moduleAlias.addAliases({
  '@': join(resolve(__dirname, '..', '..'), 'src')
})
