const {naming} = require('@galilee/aws-deployer/lib/utils');

const {stage, app} = require('../envs');

const {setS3Bucket, setS3BucketPolicy, setCloudFront, setCloudFrontFunction, setCloudFrontOriginAccessControl} = naming(stage, app.toUpperCase(), app.toUpperCase());

const constants = {
  tags: [
    {Key: 'client:project', Value: 'self-service-portal'},
    {Key: 'client:subproject', Value: 'sspfe'},
    {Key: 'client:env', Value: stage}
  ],
  cloudfront: {
    distribution: {
      webapp: setCloudFront('WebApp')
    },
    originAccessControl: {
      base: setCloudFrontOriginAccessControl('Base')
    },
    function: {
      redirectIndexRequest: setCloudFrontFunction('RedirectIndexRequest'),
    }
  },
  s3: {
    bucket: {
      webapp: setS3Bucket('WebApp'),
      config: setS3Bucket('Config')
    },
    bucketPolicy: {
      webapp: setS3BucketPolicy('WebApp', 'ro'),
      config: setS3BucketPolicy('Config', 'ro')
    }
  },
  iam: {
    role: {

    }
  }
};

constants.variables = {};
constants.parameters = {
  globalKmsKeyArn: 'GlobalKmsKeyArn',
  webappCertificateArn: 'WebAppCertificateArn',
  webappBaseDomainName: 'WebAppBaseDomainName',
};

module.exports = constants;
