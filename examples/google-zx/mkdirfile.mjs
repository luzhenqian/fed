#! /usr/bin/env zx

await $`mkdir files && cd files && touch test.txt && echo "hello, zx!" > test.txt && cat test.txt`
