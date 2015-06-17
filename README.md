# Text Temple #

### What is this repository for? ###
#### Quick summary
A super lightweight templating engine for regular text files.

#### Version
0.1.0


### How do I get set up? ###
#### Usage method
This is now available only in package format that can be used as a dependency in other Node.js projects.

#### How to include in projects
For Node.js: 
```shell
npm install --save "https://ttdeployer:triplethriver@bitbucket.org/thrivetide/text-temple/get/master.tar.gz"
```

For Meteor:

1. Go to your project's /packages directory (make one if it doesn't exists).
2. Do `meteor create --package thrivetide:text-temple`
3. Go to /package/text-temple directory and add this to the end of package.js:
```javascript
Npm.depends({
  'text-temple': 'https://ttdeployer:triplethriver@bitbucket.org/thrivetide/text-temple/get/<HASH>.tar.gz',
});
```
4. 

```shell
meteor add 
```

### Testing
* To run: `npm test`.
* To find files: __/test__ directory.