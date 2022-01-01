export class InvalidCategoryError extends Error {
  constructor(category: string) {
    super(`Category: ${category} is not valid`)
    this.name = this.constructor.name
    this.message = 'Categories must be: \\"ISSUE\\",\\"COMMENT\\",\\"IDEA\\",\\"OTHER\\"'
  }
}
