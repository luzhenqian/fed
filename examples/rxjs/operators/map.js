import { from } from 'rxjs'
import { map } from 'rxjs/operators'

const numbers$ = from([1, 2, 3, 4])

numbers$.pipe(
  map(num => "平方值: " + (num * num)))
  .subscribe(console.log)