import { expect } from 'chai'
import { pingEx } from './ping'

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

describe('[ pingRaw ]', () => {
  it('should work', async () => {
    let i = 0
    const maxCount = 2
    await new Promise(resolve => {
      const unsub = pingEx(timeoutSpy, clearTimeoutSpy)(getTimeoutMs)(() => {
        if (++i >= maxCount) {
          unsub()
          resolve()
        }
      })()
    }).then(() => {
      expect(i).eq(maxCount)
    })
  })
})
