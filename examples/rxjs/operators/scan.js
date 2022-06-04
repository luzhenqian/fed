import { from } from 'rxjs'
import { scan } from 'rxjs/operators'

const source$ = from([1, 2, 3, 4, 5])

const subscription = source$
  .pipe(scan((acc, val) => acc + val))
  .subscribe((val) => console.log('和：', val))

subscription.unsubscribe()