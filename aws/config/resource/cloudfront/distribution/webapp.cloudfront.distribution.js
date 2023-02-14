const {fn, constants} = require('@galilee/aws-deployer/lib/utils');

const {isProd, stage, version, getCustomDomainName} = require('../../../envs');

const {tags, s3, cloudfront, parameters} = require('../../constants');

const s3AppOriginId = `${s3.bucket.webapp.ref}Origin`;
const s3ConfigOriginId = `${s3.bucket.config.ref}Origin`;

module.exports.resource = () => ({
  [cloudfront.distribution.webapp.ref]: {
    Type: 'AWS::CloudFront::Distribution',
    Properties: {
      DistributionConfig: {
        Comment: `[${stage}] Self Service Portal WebApp`,
        PriceClass: isProd ? 'PriceClass_All' : 'PriceClass_100',
        Aliases: [getCustomDomainName(fn.ref(parameters.webappBaseDomainName), stage)],
        ViewerCertificate: {
          AcmCertificateArn: fn.ref(parameters.webappCertificateArn),
          MinimumProtocolVersion: 'TLSv1.2_2021',
          SslSupportMethod: 'sni-only'
        },
        Origins: [
          {
            Id: s3AppOriginId,
            OriginPath: `/${version}`,
            DomainName: fn.regionalDomainName(s3.bucket.webapp.ref),
            OriginAccessControlId: fn.attr(cloudfront.originAccessControl.base.ref, 'Id'),
            S3OriginConfig: {
              OriginAccessIdentity: ''
            }
          },
          {
            Id: s3ConfigOriginId,
            DomainName: fn.regionalDomainName(s3.bucket.config.ref),
            OriginAccessControlId: fn.attr(cloudfront.originAccessControl.base.ref, 'Id'),
            S3OriginConfig: {
              OriginAccessIdentity: ''
            }
          }
        ],
        Enabled: true,
        HttpVersion: 'http2',
        DefaultCacheBehavior: {
          TargetOriginId: s3AppOriginId,
          Compress: true,
          ViewerProtocolPolicy: 'redirect-to-https',
          AllowedMethods: ['HEAD', 'GET', 'OPTIONS'],
          CachePolicyId: constants.cloudfrontCachePolicy.cachingOptimized,
          OriginRequestPolicyId: constants.cloudfrontOriginRequestPolicy.corsS3Origin,
          FunctionAssociations: [
            {
              EventType: 'viewer-request',
              FunctionARN: fn.arnCloudfrontFunction(cloudfront.function.redirectIndexRequest.name)
            }
          ],
        },
        CacheBehaviors: [
          {
            PathPattern: '/config.json',
            TargetOriginId: s3ConfigOriginId,
            Compress: true,
            ViewerProtocolPolicy: 'redirect-to-https',
            AllowedMethods: ['HEAD', 'GET', 'OPTIONS'],
            CachePolicyId: constants.cloudfrontCachePolicy.cachingOptimized,
            OriginRequestPolicyId: constants.cloudfrontOriginRequestPolicy.corsS3Origin
          }
        ]
      },
      Tags: tags
    }
  }
});
