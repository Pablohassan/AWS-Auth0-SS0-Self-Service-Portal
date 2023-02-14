const {cloudfront} = require('../../constants');

module.exports.resource = () => ({
  [cloudfront.function.redirectIndexRequest.ref]: {
    Type: 'AWS::CloudFront::Function',
    Properties: {
      Name: cloudfront.function.redirectIndexRequest.name,
      AutoPublish: true,
      FunctionCode: `function handler(event) {
        var request = event.request;
        var uri = request.uri;
        var uriParts = request.uri.split('/');
        var lastItem = uriParts[uriParts.length - 1];

        if (uri.endsWith('/')) {
            request.uri += 'index.html';
        } else if (!lastItem.includes('.')) {
            request.uri = '/index.html';
        }

        return request;
      }`,
      FunctionConfig: {
        Comment: 'Redirect / to /index.html',
        Runtime: 'cloudfront-js-1.0'
      }
    }
  }
});
