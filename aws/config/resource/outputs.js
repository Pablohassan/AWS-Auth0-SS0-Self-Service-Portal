const {fn} = require('@galilee/aws-deployer/lib/utils');

const {cloudfront} = require('./constants');

module.exports.output = () => ({
  WebAppCloudFrontInstanceId: {
    Description: 'Webapp CloudFront instance ID',
    Value: fn.ref(cloudfront.distribution.webapp.ref)
  }
});
