var c = require('./compiler.js');

var res = c.compile('FROM ubuntu:14.04\nMAINTAINER Albert Kurniawan <albert@thrivetide.com>\n\n# Install curl, git, meteor\nRUN apt-get update && apt-get install -y curl git\nRUN curl https://install.meteor.com/ | sh\n\n# Download meteor app\nRUN git clone https://ttdeployer:triplethriver@bitbucket.org/thrivetide/boilerplate-client-mobile.git /home/app\n\n# Copy text to settings.json\nRUN printf {{settingsJson}} > /home/app/settings.json\n\n# Copy mobile app resources\n{{#each copyList}}COPY {{from}} /home/app/{{to}}\n{{/each}}\n\n# Move to app directory\nWORKDIR /home/app\n\n# Start app as entrypoint\n{{#if withSettings}}ENTRYPOINT ["meteor", "--settings", "settings.json"]{{/if}}', {
  settingsJson: 'settingsJson', 
  copyList: [
    {from: '/tmp/xzjkasdiwaerj28/icons/*', to: 'resources/icons/'},
    {from: '/tmp/xzjkasdiwaerj28/splash/*', to: 'resources/splash/'},
  ],
  withSettings: true, 
});

console.log(res);
