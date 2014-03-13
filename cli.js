#!/usr/bin/env node

var nomnom = require('nomnom')

nomnom.script('pangalink.net-client')
nomnom.help('See "pangalink.net-client <command> --help" for more details.')

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
  console.log('list', opt)
}

function add(opt) {
  console.log('add', opt)
}

function get(opt) {
  console.log('get', opt)
}

function del(opt) {
  console.log('del', opt)
}
