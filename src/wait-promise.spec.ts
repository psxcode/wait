import { expect } from 'chai'
import { waitPromiseEx } from './wait-promise'

const timeoutId = 42
const expectedTimeoutMs = 1000
const getTimeoutMs = () => expectedTimeoutMs

const timeoutSpy = (cb: any, ms: number) => {
  expect(expectedTimeoutMs).eq(ms)
  setImmediate(cb)
  return timeoutId
}

describe('[ waitPromiseRaw ]', () => {
  it('should work', async () => {
    await waitPromiseEx(timeoutSpy)(getTimeoutMs)()
  })
})
