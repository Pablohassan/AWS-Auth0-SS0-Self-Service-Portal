const {cloudfront} = require('../../constants');

module.exports.resource = () => ({
  [cloudfront.originAccessControl.base.ref]: {
    Type: 'AWS::CloudFront::OriginAccessControl',
    Properties: {
      OriginAccessControlConfig: {
        Description: 'Origin Access Control',
        Name: cloudfront.originAccessControl.base.name,
        OriginAccessControlOriginType: 's3',
        SigningBehavior: 'always',
        SigningProtocol: 'sigv4'
      }
    }
  }
});
