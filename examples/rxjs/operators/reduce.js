import { from } from 'rxjs'
import { reduce } from 'rxjs/operators'

const source$ = from([1, 2, 3, 4, 5])

const subscription = source$
  .pipe(reduce((acc, val) => acc + val))
  .subscribe((val) => console.log('总和：', val))

subscription.unsubscribe()