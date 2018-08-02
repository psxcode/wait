import { SetTimeoutFn } from './types'

export const waitPromiseEx = (setTimeout: SetTimeoutFn) =>
  (timeGetter = () => 0) =>
    (ms = timeGetter()): Promise<any> =>
      new Promise(resolve => setTimeout(resolve, ms))

export default waitPromiseEx(setTimeout)
