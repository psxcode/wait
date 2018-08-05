## Wait
Functional `setTimeout` and `setInterval`.

### wait
```ts
import wait from @psxcode/wait/wait
```
Signature:
```ts
(timeGetter = () => 0) => (callback: () => void) => (ms = timeGetter()) => CancelFn
```
> CancelFn: () => void

Usage with `timeGetter`:
```ts
const timeGetter = () => Math.random() * 1000

// create waiter function
const waiter = wait(timeGetter)(callback)

// invoke waiter
const cancel = waiter() // timeout is taken from timeGetter

// clear timeout
cancel()
```
Usage with `timeout` milliseconds:
```ts
// create waiter function, skip timeGetter
const waiter = wait()(callback)

// invoke waiter
const cancel = waiter(1000) // provide time

// clear timeout
cancel()
```
### wait-promise
```ts
import waitPromise from @psxcode/wait/wait-promise
```
Signature
```ts
(timeGetter = () => 0) => (ms = timeGetter()) => Promise<void>
```
Usage with `timeGetter`:
```ts
const timeGetter = () => Math.random() * 1000

// create waiter function
const waiter = waitPromise(timeGetter)

// invoke waiter
await waiter() // timeout is taken from timeGetter
```
Usage with `timeout` milliseconds:
```ts
// create waiter function, skip timeGetter
const waiter = waitPromise()

// invoke waiter
await waiter(1000) // provide time
```
### ping
```ts
import ping from @psxcode/wait/ping
```
Signature
```ts
(timeGetter: () => number) => (callback: () => void) => () => CancelFn
```
> CancelFn: () => void

Usage:
```ts
const timeGetter = () => Math.random() * 1000

// create pinger function
const pinger = ping(timeGetter)(callback)

// run pinger
const cancel = pinger() // returns cancel function

// cancel ping
cancel()
```
### wait-time
Same as `wait`, but without `timeGetter`
```ts
import waitTime from @psxcode/wait/wait-time
```
Signature:
```ts
(callback: () => void) => (ms: number) => CancelFn
```
> CancelFn: () => void

Usage:
```ts
// create waiter function
const waiter = waitTime(callback)

// invoke waiter
const cancel = waiter(1000) // provide time

// clear timeout
cancel()
```
### wait-time-promise
Same as `wait-promise`, but without `timeGetter`
```ts
import waitTimePromise from @psxcode/wait/wait-time-promise
```
Signature:
```ts
(ms: number) => Promise<void>
```
Usage:
```ts
// invoke waiter
await waitTimePromise(1000) // provide time
```
