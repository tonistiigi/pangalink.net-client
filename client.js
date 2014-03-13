var assert = require('assert')

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

}

Client.prototype.deleteProject = function(id, cb) {

}
