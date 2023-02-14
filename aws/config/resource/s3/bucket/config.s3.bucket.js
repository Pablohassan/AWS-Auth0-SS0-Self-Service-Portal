const {fn} = require('@galilee/aws-deployer/lib/utils');

const {s3, parameters, tags} = require('../../constants');

module.exports.resource = () => ({
  [s3.bucket.config.ref]: {
    Type: 'AWS::S3::Bucket',
    Properties: {
      BucketName: s3.bucket.config.name,
      AccessControl: 'Private',
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true
      },
      VersioningConfiguration: {
        Status: 'Enabled'
      },
      LifecycleConfiguration: {
        Rules: [
          {
            Id: '45d_versions_retention',
            NoncurrentVersionExpiration: {
              NoncurrentDays: 45
            },
            Status: 'Enabled'
          }
        ]
      },
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: {
              SSEAlgorithm: 'aws:kms',
              KMSMasterKeyID: fn.ref(parameters.globalKmsKeyArn)
            }
          }
        ]
      },
      Tags: tags
    }
  }
});
