const {fn} = require('@galilee/aws-deployer/lib/utils');

const {s3, cloudfront} = require('../../constants');

module.exports.resource = () => ({
  [s3.bucketPolicy.config.ref]: {
    Type: 'AWS::S3::BucketPolicy',
    Properties: {
      Bucket: fn.ref(s3.bucket.config.ref),
      PolicyDocument: {
        Statement: [
          {
            Effect: 'Allow',
            Action: ['s3:GetObject'],
            Principal: '*',
            Resource: [fn.arnS3Bucket(s3.bucket.config.name, '/config.json')],
            Condition: {
              StringEquals: {
                'AWS:SourceArn': fn.arnCloudfrontDistribution(fn.ref(cloudfront.distribution.webapp.ref))
              }
            }
          }
        ]
      }
    }
  }
});
