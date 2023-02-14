#!/usr/bin/env node

const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const repositoryUrl = require('../../package.json').repository.url.replace(':', '/').replace('git@', 'https://').replace('.git', '');

const versionRange = process.argv[2];
if (!versionRange || !versionRange.match(/.*\.\..*/i)) {
  console.error('Please provide the version range you want to print (Probably latest version on KB dot dot current version)');
  console.error('Example: npm run changelog:build 1.35.2..1.36.0');
  process.exit(1);
}
(async () => {
  try {
    const {stdout: changelog} = await exec(
      `git --no-pager log ${versionRange} --no-merges --date=format:"%Y/%m/%d" --pretty=format:"%s (<span style=\\"color:blue\\">%ad</span> by <span style=\\"color:red\\">%an</span> @[${repositoryUrl}/-/commit/%h %h])"`
    );
    const formattedChangelog = changelog
      .split('\n')
      .filter(line => !/Prepare new version|Resolve conflicts|Chore\//gi.test(line))
      .map(line =>
        line
          .trim()
          .replace(/Chore *:/g, '')
          .replace(/Fix *#(\d+)/gi, `Fix #[${repositoryUrl}/-/issues/$1 $1]`)
          .replace(/(Feature|US) *#(\d+)/gi, 'US #[https://axosoft.galilee.fr/axosoft/viewitem?id=$2&type=features&force_use_number=true $2]')
          .replace(/\s{2,}/g, ' ')
          .replace(/^(\[[^\]]+]) (.)/g, (m, scope, firstChar) => `'''${scope.toUpperCase()}''' ${firstChar.toUpperCase()}`)
      );

    console.log(formattedChangelog.join('<br/>\n'));
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
