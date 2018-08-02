import { ClearTimeoutFn, SetTimeoutFn } from './types'

export const waitEx = (setTimeout: SetTimeoutFn, clearTimeout: ClearTimeoutFn) =>
  (timeGetter = () => 0) =>
    (cb: () => void) =>
      (ms = timeGetter()) => {
        let done = false
        const id = setTimeout(() => done || cb(), ms)
        return () => {
          done = true
          clearTimeout(id)
        }
      }

export default waitEx(setTimeout, clearTimeout)
