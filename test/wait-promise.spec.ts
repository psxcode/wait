import { describe, it } from 'mocha'
import { expect } from 'chai'
import { waitPromiseEx } from '../src/wait-promise'

function makeTimeoutSpies () {
  const timeoutId = 42
  const expectedTimeoutMs = 1000

  return {
    timeoutSpy (cb: any, ms: number) {
      expect(expectedTimeoutMs).eq(ms)
      setImmediate(cb)

      return timeoutId
    },
    timeoutGetter () {
      return expectedTimeoutMs
    },
  }
}

describe('[ waitPromiseRaw ]', () => {
  it('should work', async () => {
    const { timeoutSpy, timeoutGetter } = makeTimeoutSpies()
    await waitPromiseEx(timeoutSpy)(timeoutGetter)()
  })
})
