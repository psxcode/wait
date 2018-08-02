import { expect } from 'chai'
import * as sinon from 'sinon'
import { waitEx } from './wait'

const timeoutId = 42
const expectedTimeoutMs = 1000
const getTimeoutMs = () => expectedTimeoutMs

const timeoutSpy = (cb: any, ms: number) => {
  expect(expectedTimeoutMs).eq(ms)
  setImmediate(cb)
  return timeoutId
}

const clearTimeoutSpy = (id: any) => {
  expect(timeoutId).eq(id)
}

describe('[ waitRaw ]', () => {
  it('should work', (done) => {
    waitEx(timeoutSpy, clearTimeoutSpy)(getTimeoutMs)(done)()
  })

  it('should cancel', (done) => {
    const spy = sinon.spy()
    const unsub = waitEx(timeoutSpy, clearTimeoutSpy)(getTimeoutMs)(spy)()
    unsub()
    setTimeout(() => {
      sinon.assert.notCalled(spy)
      done()
    }, 10)
  })
})
