# singledb

## Usage:

> typescript

```typescript
import Database from 'singledb';
const db = new Database('./db.json');
// set
db.key = 'value';
// get
console.log(db.key);
// delete
delete db.key;
```

> javascript

```javascript
const { Database } = require('singledb');
const db = new Database('./db.json');
// set
db.key = 'value';
// get
console.log(db.key);
// delete
delete db.key;
```
