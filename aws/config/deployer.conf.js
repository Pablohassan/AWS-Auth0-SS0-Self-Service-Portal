const path = require('path');

const {s3, parameters, tags} = require('./resource/constants');

const {stage, app, version} = require('./envs');

const {PARAM_GLOBAL_KMS_KEY_ARN, PARAM_WEBAPP_CERTIFICATE_ARN, PARAM_WEBAPP_BASE_DOMAIN_NAME} = process.env;

module.exports = {
  stage,
  app,
  version,
  deployTags: tags,
  parameters: [
    {
      ParameterKey: parameters.globalKmsKeyArn,
      ParameterValue: PARAM_GLOBAL_KMS_KEY_ARN
    },
    {
      ParameterKey: parameters.webappCertificateArn,
      ParameterValue: PARAM_WEBAPP_CERTIFICATE_ARN
    },
    {
      ParameterKey: parameters.webappBaseDomainName,
      ParameterValue: PARAM_WEBAPP_BASE_DOMAIN_NAME
    }
  ],
  resource: {
    path: 'aws/config/resource'
  },
  build: {
    path: '.build'
  },
  syncBuckets: [
    {
      mode: 'sync',
      input: 'build',
      bucketPath: version,
      bucket: s3.bucket.webapp.name
    },
    {
      mode: 'cp',
      input: path.join('aws', 'config', 'files', 'config', 'config.json.template'),
      bucket: s3.bucket.config.name
    }
  ]
};
