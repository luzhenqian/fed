import { Subject, of } from 'rxjs'
import { mergeMap, delay } from 'rxjs/operators'

// 发送数据到服务的主题
const publishToServer$ = of("演示数据").pipe(delay(100));
// 控制开关的主题
const switch$ = new Subject()

// 内部可以有多个订阅者
const subscription = switch$.pipe(
    mergeMap(toggle => publishToServer$)
).subscribe(data => console.log('接收到的数据: ' + data))

// 模拟操作
setTimeout(() => switch$.next(true), 1000);
setTimeout(() => switch$.next(false), 2000);
setTimeout(() => switch$.next(true), 3000);

setTimeout(() => subscription.unsubscribe(), 4000);