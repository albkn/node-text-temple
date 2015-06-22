# Text Temple #
v0.1.0

---
## Quick summary
A super lightweight templating engine for regular text files.


## Installing
#### Node.js: 
```shell
npm install --save "https://ttdeployer:triplethriver@bitbucket.org/thrivetide/text-temple/get/master.tar.gz"
```

#### Meteor:
Basically create a Meteor wrapper package. 

If you don't know how:

1. Go to your project's __/packages__ directory (make one if it doesn't exists).
2. Do `meteor create --package thrivetide:text-temple`
3. Add to __/packages/text-temple/text-temple.js__:

        Temple = Npm.require('text-temple');

4. Add this to __/packages/text-temple/package.js__ (note that the long hash before '.tar.gz' must be hardcoded there, look at bitbucket for newer commit versions): 
        
        Package.onUse(function(api) {
          api.versionsFrom('1.1.0.2');
          api.export('Temple', 'server');
        });
        
        Npm.depends({
          'text-temple': 'https://ttdeployer:triplethriver@bitbucket.org/thrivetide/text-temple/get/e6afd4b860214a91ba04d44d7087d3efeb530de5.tar.gz',
        });
        

5. Add as dependecy: `meteor add thrivetide:text-temple`

## Examples
Coming soon


## Testing
* To run: `npm test`.
* To find files: __/test__ directory.