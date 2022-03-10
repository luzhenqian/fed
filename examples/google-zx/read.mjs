#! /usr/bin/env zx

async function checkConfig () {
  try {
    await $`git config receive.denyCurrentBranch`
  } catch (err) {
    if(err.exitCode === 1) {
      await $`git config receive.denyCurrentBranch ignore`
    }
  }
}

await checkConfig()
