# Text Temple #
v0.1.0

---
## Quick summary
A lightweight templating engine for regular text files.


## Installing
#### Node.js: 
```shell
npm install --save "https://github.com/kAlbert19/node-text-temple/archive/master.tar.gz"
```

#### Meteor:
Create a Meteor wrapper package:

1. Go to your project's __/packages__ directory (make one if it doesn't exists).
2. Do `meteor create --package tendo:text-temple`
3. Add to __/packages/text-temple/text-temple.js__:

        Temple = Npm.require('text-temple');

4. Add this to __/packages/text-temple/package.js__ (note that the long hash before '.tar.gz' must be hardcoded there, look at github for newer commit versions): 
        
        Package.onUse(function(api) {
          api.versionsFrom('1.1.0.2');
          api.export('Temple', 'server');
        });
        
        Npm.depends({
          'text-temple': 'https://github.com/kAlbert19/node-text-temple/archive/<latestHash>.tar.gz',
        });
        

5. Add as dependecy: `meteor add tendo:text-temple`

## Examples
Coming soon


## Testing
* To run: `npm test`.
* To find files: __/test__ directory.
