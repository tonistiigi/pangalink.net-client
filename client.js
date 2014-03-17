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
  var req = emptyRequest(this)
  req.url += 'project'

  var results = []
  loadFromIndex(opt.startIndex || 0)

  function loadFromIndex(index) {
    req.qs = {start_index: index}
    request(req, function(err, resp, json) {
      if (err) return cb(err)
      if (json.error) {
        cb(errorResponse(json))
      }
      else {
        json = json.data
        // more rows than needed
        if (opt.endIndex && opt.endIndex < json.end_index) {
          json.list = json.list.slice(0, opt.endIndex - json.end_index)
        }
        results = results.concat(json.list)
        // need to make more requests
        if (json.end_index + 1 < json.total &&
           (!opt.endIndex || opt.endIndex > json.end_index)) {
          loadFromIndex(json.end_index + 1)
        }
        else {
          cb(null, opt.filter ? results.filter(filter) : results)
        }
      }
    })
  }

  function filter(p) {
    var regexp = new RegExp(opt.filter)
    return regexp.test(p.name) || regexp.test(p.type)
  }
}

Client.prototype.getProject = function(id, cb) {
  var req = emptyRequest(this)
  req.url += 'project/' + id

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
  var req = emptyRequest(this)
  req.url += 'project/' + id
  req.method = 'DELETE'

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

Client.prototype.getBanks = function(cb) {
  var req = emptyRequest(this)
  req.url += 'banks'
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
