# Wait
Functional `setTimeout` and `setInterval`.

### Install
```ts
npm install @psxcode/wait
```

### `wait`
```ts
import { wait } from '@psxcode/wait'

// Signature
(timeGetter = () => 0) =>  // provide optional time getter
  (callback: () => void) =>            // callback
  (ms = timeGetter()) =>               // provide optional wait ms
  () => void                           // returns cancel function
```

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

### `wait-promise`
```ts
import { waitPromise } from '@psxcode/wait'

// Signature
(timeGetter = () => 0) => // provide optional time getter
  (ms = timeGetter()) =>                     // provide optional ms
  Promise<void>                              // returns Promise
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

### `ping`
```ts
import { ping } from '@psxcode/wait'

// Signature
(timeGetter: () => number) =>  // provide optional time getter
  (callback: () => void) =>                // provide callback
  () =>                                    // invoke to run
  () => void                               // returns cancel function
```

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

### `wait-time`
Same as `wait`, but without `timeGetter`
```ts
import { waitTime } from '@psxcode/wait'

// Signature
(callback: () => void) =>  // provide callback
  (ms: number) =>                          // provide ms
  () => void                               // returns cancel function
```

Usage:
```ts
// create waiter function
const waiter = waitTime(callback)

// invoke waiter
const cancel = waiter(1000) // provide time

// clear timeout
cancel()
```

### `wait-time-promise`
Same as `wait-promise`, but without `timeGetter`
```ts
import { waitTimePromise } from '@psxcode/wait'

// Signature
(ms: number) => // provide ms
  Promise<void>                        // returns Promise
```

Usage:
```ts
// invoke waiter
await waitTimePromise(1000) // provide time
```
