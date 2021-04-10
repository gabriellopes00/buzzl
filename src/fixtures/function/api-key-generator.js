// const ID = () => '_' + Math.random().toString(36).substr(2, 12).toLowerCase()

// function asdf() {
//   const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz'
//   const len = 11
//   var rtn = '_'
//   for (var i = 0; i < len; i++) rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length))
//   return rtn
// }

// const pattern = /^_[a-z0-9]{11}/i
// for (let index = 0; index < 599; index++) if (!pattern.test(asdf())) console.log('failed')

const pattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
console.log(pattern.test('fa99c520-352a-4b8f-9f13-754a1da8ab3c'))
