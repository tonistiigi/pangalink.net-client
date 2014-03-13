var Client = require('./client').Client

exports.createClient = createClient
exports.Client = Client

function createClient(opt) {
  return new Client(opt)
}
