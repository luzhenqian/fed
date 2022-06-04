import { Subject } from 'rxjs'
import { concatMap, filter } from 'rxjs/operators'

// 发布数据的主题
const dataStream$ = new Subject()
// 控制开关的主题
const switch$ = new Subject();

const subscription = switch$.pipe(
    filter(toggle => toggle),
    concatMap(toggle => dataStream$)
).subscribe(time => console.log('接收到的数据是: ' + time))

setTimeout(() => switch$.next(true), 1000);
setTimeout(() => dataStream$.next(1), 2000);
setTimeout(() => switch$.next(false), 4000);

setTimeout(() => {
    dataStream$.next(2);
    dataStream$.complete()
}, 5000);

setTimeout(() => subscription.unsubscribe(), 5500);