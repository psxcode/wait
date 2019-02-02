import { describe, it } from 'mocha'
import { expect } from 'chai'
import { pingEx } from '../src/ping'

function makeTimeoutSpies () {
  let timeoutId = 42
  let canceled = false
  const expectedTimeoutMs = 1000
  return {
    timeoutSpy (cb: any, ms: number) {
      expect(expectedTimeoutMs).eq(ms)
      canceled = false
      setImmediate(() => canceled || cb())
      return timeoutId
    },
    clearTimeoutSpy (id: any) {
      expect(timeoutId).eq(id)
      canceled = true
    },
    timeoutGetter () {
      return expectedTimeoutMs
    }
  }
}

describe('[ pingRaw ]', () => {
  it('should work', async () => {
    let i = 0
    const maxCount = 2
    await new Promise(resolve => {
      const { timeoutSpy, clearTimeoutSpy, timeoutGetter } = makeTimeoutSpies()
      const unsub = pingEx(timeoutSpy, clearTimeoutSpy)(timeoutGetter)(() => {
        if (++i >= maxCount) {
          unsub()
          resolve()
        }
      })()
    })

    await new Promise(resolve => setTimeout(resolve, 10))

    expect(i).eq(maxCount)
  })
})
