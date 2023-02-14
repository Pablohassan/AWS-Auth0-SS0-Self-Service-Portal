const {fn} = require('@galilee/aws-deployer/lib/utils');

const {version} = require('../../package.json');

const {APP_STAGE, AWS_DEFAULT_REGION} = process.env;

const ENV_TEST = 'test';
const ENV_UAT = 'uat';
const ENV_STAGE = 'stage';
const ENV_PROD = 'prod';

const stage = APP_STAGE;
const region = AWS_DEFAULT_REGION;
const isEnvDev = ![ENV_TEST, ENV_UAT, ENV_STAGE, ENV_PROD].includes(APP_STAGE);
const isEnvTest = APP_STAGE === ENV_TEST;
const isEnvUat = APP_STAGE === ENV_UAT;
const isEnvProd = APP_STAGE === ENV_PROD;
const isEnvProdReady = [ENV_STAGE, ENV_PROD].includes(APP_STAGE);

const getCustomDomainName = (baseDomainName, currentStage) => {
  let prefix = '';

  if (isEnvDev) {
    prefix = `dev-${currentStage}.`;
  } else if (!isEnvProd) {
    prefix = `${currentStage}.`;
  }

  return fn.join(prefix.toLowerCase(), baseDomainName);
};

module.exports = {
  app: 'sspfe',
  version,
  stage,
  region,
  isEnvDev,
  envTest: ENV_TEST,
  isEnvTest,
  isEnvUat,
  isEnvProd,
  isEnvProdReady,
  getCustomDomainName
};
