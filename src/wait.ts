import { ClearTimeoutFn, SetTimeoutFn } from './types'

export const waitEx = (setTimeout: SetTimeoutFn, clearTimeout: ClearTimeoutFn) =>
  (timeGetter = () => 0) =>
    (cb: () => void) =>
      (ms = timeGetter()) => {
        const id = setTimeout(cb, ms)

        return () => {
          clearTimeout(id)
        }
      }

export default waitEx(setTimeout, clearTimeout)
