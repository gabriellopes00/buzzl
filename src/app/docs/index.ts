import components from './components'
import metadata from './metadata/metadata'
import servers from './metadata/servers'
import tags from './metadata/tags'

import paths from './paths'

export default {
  openapi: '3.0.0',
  info: metadata,
  servers: servers,
  tags: tags,
  paths: paths,
  components: components
}
