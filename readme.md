Small Node.js client for pangalink.net API.

```
var pangalink = require('pangalink.net-client')
var client = pangalink.createClient()

client.getProjects([opt], function(err, projects) {

})

client.getProject(id, function(err, project) {

})

client.addProject(data, function(err, project) {

})

client.deleteProject(id, function(err) {

})
```