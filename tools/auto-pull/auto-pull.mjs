#! /usr/bin/env zx

/**
 * 0. 该脚本基于 zx，zx 需要 node 16+，如果使用 n 做 node 版本控制，首先安装 node 的 lts 版本
 * n lts
 * 1. 需要全局安装 zx
 * npm i -g zx
 * 2. 需要该文件的执行权限
 * chmod +x ./auto-pull.mjs
 * 3. 运行该文件
 * ./auto-pull.mjs
 */

 const config = {
  url: "ssh://git@gits.boluome.com:1111/OTOSaaS/oto_saas_web_app_rebuild_test_publish.git",
  branch: "develop",
  interval: 5000,
};

/**
 * 获取远程仓库的 hash
 * @param {string} url remote url
 * @param {string} branch
 * @returns
 */
async function getRemoteHash(url, branch) {
  return (await $`git ls-remote ${url} ${branch} HEAD`).stdout;
}

/**
 * 获取本地仓库的 hash
 * @param {string} branch
 * @returns
 */
async function getLocalHash(branch) {
  return (await $`git rev-parse ${branch} HEAD`).stdout.split('\n')[0];
}

async function checkConfig() {
  try {
    await $`git config receive.denyCurrentBranch`;
  } catch (err) {
    if (err.exitCode === 1) {
      await $`git config receive.denyCurrentBranch ignore`;
    }
  }
}

function wait() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, config.interval);
  });
}

async function pull() {
  await $`git pull`;
}

async function autoPull() {
  while (true) {
    const remoteHashs = (await getRemoteHash(config.url, config.branch));
    const localHash = (await getLocalHash(config.branch));
    if (remoteHashs.includes(localHash)) {
      await wait();
    } else {
      await pull();
    }
  }
}

async function run() {
  await checkConfig();
  await autoPull();
}

try {
  await run();
} catch (e) {
  await run();
}
