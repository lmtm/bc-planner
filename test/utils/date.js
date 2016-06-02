import { expect } from 'chai'
import * as date from '../../app/utils/date'

describe('utils/date', () => {
  it('should serialize dates', () => {
    expect(date.serialize('2011-11-11')).to.equal('2011-11-11')
    expect(date.serialize('2016-02-29')).to.equal('2016-02-29')
  })

  it('should add 1 month', () => {
    const dates = [
      ['2011-11-11', '2011-12-11'],
      ['2011-12-11', '2012-01-11'],
      ['2016-10-31', '2016-11-30'], // FIX-ME
      ['2016-11-30', '2016-12-30']
    ]
    dates.forEach(([a, b]) => {
      const res = date.addMonth(new Date(a), 1).getTime()
      const expected = (new Date(b)).getTime()
      expect(res).to.equal(expected)
    })
  })
})
