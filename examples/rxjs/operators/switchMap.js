import { Subject, interval } from 'rxjs'
import { switchMap, filter } from 'rxjs/operators'

// 每秒发送一次数据的计时器主题
const timer$ = interval(1000)
// 控制开关的主题
const switch$ = new Subject();
// 只有在开关打开时定时器才可以发送数据
const subscription = switch$.pipe(
    filter(toggle => toggle),
    switchMap(toggle => timer$)
).subscribe(time => console.log(time + '秒'))

// 模拟用户操作
setTimeout(() => switch$.next(true), 1000);
setTimeout(() => switch$.next(false), 4000);

setTimeout(() => console.log('-------'), 5500);

setTimeout(() => switch$.next(true), 6000);
setTimeout(() => switch$.next(false), 7000);

setTimeout(() => subscription.unsubscribe(), 10000);