import { waitEx } from './wait'
import { ClearTimeoutFn, SetTimeoutFn } from './types'

export const pingEx = (setTimeout: SetTimeoutFn, clearTimeout: ClearTimeoutFn) => {
  const waitFn = waitEx(setTimeout, clearTimeout)

  return (timeGetter: () => number) =>
    (cb: () => void) => {
      let unsub: any
      let done = false
      const wait = waitFn(timeGetter)(() => {
        if (!done) {
          cb()
          unsub = wait()
        }
      })

      return () => {
        unsub = wait()

        return () => {
          done = true
          unsub()
        }
      }
    }
}

export default pingEx(setTimeout, clearTimeout)
