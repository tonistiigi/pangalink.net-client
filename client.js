var assert = require('assert')
var request = require('request')

exports.Client = Client

function Client(opt) {
  this.apiKey = opt.apiKey
  this.mashapeKey = opt.mashapeKey
  this.url = opt.url

  if (this.url[this.url.length - 1] !== '/') {
    this.url += '/'
  }
}

Client.prototype.getProjects = function(opt, cb) {
  if (typeof opt === 'function') {
    opt = {}
    cb = opt
  }
}

Client.prototype.getProject = function(id, cb) {

}

Client.prototype.addProject = function(data, cb) {
  if (typeof opt === 'function') {
    data = {}
    cb = opt
  }
  var req = emptyRequest(this)
  req.url += 'project'
  req.method = 'POST'
  req.body = data
  request(req, function(err, resp, json) {
    if (err) return cb(err)
    if (json.error) {
      cb(errorResponse(json))
    }
    else {
      cb(null, json.data)
    }
  })
}

Client.prototype.deleteProject = function(id, cb) {

}

function emptyRequest(client) {
  var headers = {access_token: client.apiKey}
  if (client.mashapeKey) {
    headers['X-Mashape-Authorization'] = client.mashapeKey
  }

  return {
    url: client.url,
    headers: headers,
    json: true
  }
}

function errorResponse(json) {
  var fields = []
  for (var i in json.fields) {
    fields.push(json.fields[i])
  }
  return Error(json.error + ': ' + fields.join(', '))
}
