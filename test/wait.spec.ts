import { describe, it } from 'mocha'
import { expect } from 'chai'
import { createSpy, getSpyCalls } from 'spyfn'
import { waitEx } from '../src/wait'

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

describe('[ waitRaw ]', () => {
  it('should work', (done) => {
    const { timeoutSpy, clearTimeoutSpy, timeoutGetter } = makeTimeoutSpies()
    waitEx(timeoutSpy, clearTimeoutSpy)(timeoutGetter)(done)()
  })

  it('should cancel', (done) => {
    const { timeoutSpy, clearTimeoutSpy, timeoutGetter } = makeTimeoutSpies()
    const spy = createSpy(() => {})
    const unsub = waitEx(timeoutSpy, clearTimeoutSpy)(timeoutGetter)(spy)()
    unsub()

    setTimeout(() => {
      expect(getSpyCalls(spy)).deep.eq([])
      done()
    }, 10)
  })
})
