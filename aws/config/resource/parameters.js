const {app} = require('../envs');
const {parameters} = require('./constants');

module.exports.parameter = () => ({
  [parameters.globalKmsKeyArn]: {
    Type: 'String',
    Description: `[${app}] Global KMS Key ARN`,
    AllowedPattern: '^arn:aws:kms:[a-zA-Z0-9-]+:\\d{12}:key/[a-zA-Z0-9-_]+$'
  },
  [parameters.webappBaseDomainName]: {
    Type: 'String',
    Description: `[${app}] WebApp Base domain name`
  },
  [parameters.webappCertificateArn]: {
    Type: 'String',
    Description: `[${app}] WebApp Certificate ARN`,
    AllowedPattern: '^arn:aws:acm:[a-zA-Z0-9-]+:\\d{12}:certificate/[a-zA-Z0-9-_]+$'
  }
});
