import { Subject } from 'rxjs'
import { bufferCount } from 'rxjs/operators'

const source$ = new Subject()

const subscription = source$.pipe(bufferCount(3)).subscribe(value => console.log('接收到的值是：', value))

setTimeout(() => { source$.next(1) }, 1000)
setTimeout(() => { source$.next(2) }, 2000)
setTimeout(() => { source$.next(3) }, 3000)
setTimeout(() => { source$.next(4) }, 4000)
setTimeout(() => { source$.next(5) }, 5000)
setTimeout(() => { subscription.unsubscribe() }, 6000)