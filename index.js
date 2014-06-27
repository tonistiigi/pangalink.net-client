var assert = require('assert')
var Client = require('./client').Client

exports.createClient = createClient
exports.Client = Client

function createClient(opt) {
  opt = opt || {}
  opt.apiKey = opt.apiKey || process.env.PANGALINK_API_KEY
  opt.url = opt.url || process.env.PANGALINK_API_URL ||
    'https://pangalink.net/api/'

  assert(opt.apiKey, 'apiKey is not set')

  return new Client(opt)
}
