import { times, days } from '../schedule.fixture'
import fixtures from '../__fixtures__/schedule'

describe('SpeedTabPanel', () => (
  describe('schedule fixture', () => {
    it('times equals', () => {
      expect(times).toEqual(fixtures.times)
    })
    it('days returns all valid days with values', () => {
      expect(days).toEqual(fixtures.days)
    })
  })
))
