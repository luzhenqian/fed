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

// TODO: 比对 hash 再进行 pull
// 获取远程仓库某分支的 hash： git ls-remote url branch HEAD
// 获取本地仓库某分支的 hash： git rev-parse branch HEAD
// const remoteUrl = 'ssh://git@gits.boluome.com:1111/OTOSaaS/oto_saas_web_app_ctrip_train.git'
// const cmd  = 'git ls-remote ssh://git@gits.boluome.com:1111/OTOSaaS/oto_saas_web_app_ctrip_train.git a HEAD'
const remoteBranch = 'develop'
const cmd = 'git ls-remote ssh://git@gits.boluome.com:1111/OTOSaaS/oto_saas_web_app_ctrip_train.git develop HEAD'
 (function run() {
  // const remoteCurrentHash = $`git ls-remote ${remoteUrl} ${remoteBranch} HEAD`
  $`${cmd}`
    .then(data=> {
      console.log('data: ', data)
    })
  // const remoteCurrentHash = $`git ls-remote ${remoteUrl} HEAD`
  // $`git pull`.then(run);
})();

[receive]

        denyCurrentBranch = ignore
