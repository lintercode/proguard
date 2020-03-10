### Documentation for Proguard

### MiddleWares

**LogInRequired**
To use the logInRequired Middleware simply add it to the route like so:
```javascript
  const { logInRequired } = require('../authentication/index')

  router.post('/admin/user', logInRequired, ...)

```
