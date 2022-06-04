import { Subject } from 'rxjs';
import { buffer } from 'rxjs/operators';

// buffer 主题，当这个主题有值发出，buffer 才会终止。
const bufferStop$ = new Subject();
// 数据源主题
const source$ = new Subject();

const subscription = source$
  .pipe(buffer(bufferStop$))
  .subscribe(val => console.log('缓存数据:', val));

// 模拟操作
setTimeout(() => source$.next(1), 1000);
setTimeout(() => source$.next(2), 2000);
setTimeout(() => bufferStop$.next("终止缓存"), 3000);
setTimeout(() => source$.next(3), 4000);

setTimeout(() => subscription.unsubscribe(), 5000);