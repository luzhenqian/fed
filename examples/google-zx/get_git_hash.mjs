#! /usr/bin/env zx

async function getRemoteHash(url, branch) {
  return await $`git ls-remote ${url} ${branch} HEAD`
}

async function getLocalHash(branch) {
  return await $`git rev-parse ${branch} HEAD`
}

const url = 'ssh://git@gits.boluome.com:1111/OTOSaaS/oto_saas_web_app_ctrip_train.git'
const branch = 'develop'

const remoteHashs = (await getRemoteHash(url, branch)).stdout
const remoteHashRegexp = new RegExp(`/\n(.*)\trefs\/heads\/${branch}/`)
const remoteHash = remoteHashs.match(remoteHashs)
console.log('remoteHash: ', remoteHash)
const localHash = (await getLocalHash('master')).stdout
console.log(remoteHashs.includes(localHash))
