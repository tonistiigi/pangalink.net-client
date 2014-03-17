Small Node.js client for pangalink.net API.

```
var pangalink = require('pangalink.net-client')
var client = pangalink.createClient()

/* opt: apiKey, mashapeKey, url */
client.getProjects([opt], function(err, projects) {

})

client.getProject(id, function(err, project) {

})

client.addProject(data, function(err, project) {

})

client.deleteProject(id, function(err) {

})
```

If API keys are not set library tries to load them from environment variables:

```
PANGALINK_API_KEY
PANGALINK_MASHAPE_KEY
```

Setting these env variables is the preferred way for using the library.


#### CLI tool

Small command line utility is also included. To use it install the module globally `npm install -g pangalink.net-client`.

```
 ✪  pangalink.net-client --help

Usage: pangalink.net-client <command>

command
  banks      Show available banks
  list       List all projects
  add        Add new project
  get        Get project's parameters
  delete     Delete project

See "pangalink.net-client <command> --help" for more details.

Use environment variables to set your API key and Mashape key.
API keys can be copied from: https://pangalink.net/api

For one time use:
> PANGALINK_API_KEY=abc PANGALINK_MASHAPE_KEY=def pangalink.net-client

Activate for current session:
> export PANGALINK_API_KEY=abc
> export PANGALINK_MASHAPE_KEY=abc
> pangalink.net-client

For permanent usage, add export calls to ~/.basrc file.



 ✪  pangalink.net-client list --help

Usage: pangalink.net-client list [options]

Options:
   -s, --startIndex   Skip items until this index.
   -e, --endIndex     Skip items after this index.
   -f, --filter       Only show matching projects.
   -j, --json         Output JSON

List all projects



 ✪  pangalink.net-client add --help

Usage: pangalink.net-client add [options]

Options:
   --type
   --name
   --description
   --account_owner
   --account_nr
   --key_size
   --return_url
   --algo
   --auto_response

Add new project



 ✪  pangalink.net-client get --help

Usage: pangalink.net-client get <id> [options]

id     Project ID

Options:
   -f, --format   Single field to output

Get project's parameters



 ✪  pangalink.net-client delete --help

Usage: pangalink.net-client delete <id>

id     Project ID

Delete project

```