class Logger {
  public async log(payload: any): Promise<void> {
    setTimeout(function () {
      console.log(payload)
    }, 3000)
  }
}

function log() {
  console.log('decorator actived')
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const logger = new Logger()
    if (descriptor.value()?.responseError instanceof Error) logger.log(descriptor.value())
  }
}

class Controller {
  @log()
  async handle(): Promise<Object> {
    try {
      // throw new Error('any_internal_error')
      const asdf = null
      const response = asdf.gabriel()
      // const response = 900 ** 4

      return { response }
    } catch (error) {
      return { responseError: error }
    }
  }
}

const asdf = new Controller()
console.log(asdf.handle())
