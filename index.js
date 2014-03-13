var assert = require('assert')
var Client = require('./client').Client

exports.createClient = createClient
exports.Client = Client

function createClient(opt) {
  opt = opt || {}
  opt.apiKey = opt.apiKey || process.env.PANGALINK_API_KEY
  opt.mashapeKey = opt.mashapeKey || process.env.PANGALINK_MASHAPE_KEY
  opt.url = opt.url || process.env.PANGALINK_API_URL ||
    'https://pangalink.p.mashape.com/'

  assert(opt.apiKey, 'apiKey is not set')
  if (/mashape/.test(opt.url)) {
    assert(opt.mashapeKey, 'mashapeKey is not set')
  }

  return new Client(opt)
}
