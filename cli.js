#!/usr/bin/env node

var nomnom = require('nomnom')

var USAGE =
  'Use environmental variables to set your API key and Mashape key.\n' +
  'API keys can be copied from: https://pangalink.net/api\n\n' +
  'For one time use:\n' +
  '> PANGALINK_API_KEY=abc PANGALINK_MASHAPE_KEY=def pangalink.net-client\n' +
  '\n' +
  'Activate for current session:\n' +
  '> export PANGALINK_API_KEY=abc\n' +
  '> export PANGALINK_MASHAPE_KEY=abc\n' +
  '> pangalink.net-client\n' +
  '\n' +
  'For permanent usage, add export calls to ~/.basrc file.\n'

nomnom.script('pangalink.net-client')
nomnom.help('See "pangalink.net-client <command> --help" for more details.' +
  '\n\n' + USAGE)

nomnom.command('list')
  .help('List all projects')
  .option('startIndex', {abbr: 's', help: 'Skip items until this index.'})
  .option('endIndex', {abbr: 'e', help: 'Skip items after this index.'})
  .option('filter', {abbr: 'f', help: 'Only show matching projects.'})
  .callback(list)

nomnom.command('add')
  .help('Add new project')
  //.option('foo', {help: 'Foo bar baz'})
  .callback(add)

nomnom.command('get')
  .help('Get project\'s parameters')
  .option('id', {position: 1, required: true, help: 'Project ID'})
  .option('format', {abbr: 'f', help: 'Single field to output'})
  .callback(get)

nomnom.command('delete')
  .help('Delete project')
  .option('id', {position: 1, required: true, help: 'Project ID'})
  .callback(del)

nomnom.parse()


function list(opt) {
  var client = createClient()
  console.log('list', opt)
}

function add(opt) {
  var client = createClient()
  console.log('add', opt)
}

function get(opt) {
  var client = createClient()
  console.log('get', opt)
}

function del(opt) {
  var client = createClient()
  console.log('del', opt)
}

function createClient() {
  try {
    var client = require('./').createClient()
  }
  catch (e) {
    console.log('Not enough credentials set for using the API.')
    console.log(USAGE)
    console.error('Raw Error:', e)
    process.exit(1)
  }
  return client
}
