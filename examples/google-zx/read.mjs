#! /usr/bin/env zx

$`cat ../../.git/config`.then(data => {
  const matchResult = data.stdout.match(`denyCurrentBranch = ignore`)
  if(matchResult === null) {
    $`echo "\n[receive] \n        denyCurrentBranch = ignore" >> ../../.git/config`.then(data => {
      console.log('data: ', data)
    })
  }
})
