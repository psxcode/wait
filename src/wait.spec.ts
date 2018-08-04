import { expect } from 'chai'
import * as sinon from 'sinon'
import { waitEx } from './wait'

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
    const spy = sinon.spy()
    const unsub = waitEx(timeoutSpy, clearTimeoutSpy)(timeoutGetter)(spy)()
    unsub()
    setTimeout(() => {
      sinon.assert.notCalled(spy)
      done()
    }, 10)
  })
})
