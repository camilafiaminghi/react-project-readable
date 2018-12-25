import { timeDiff, formatTimeDiff } from './../dateUtils'

let timestamp = 1468479767190
let now = new Date(2018,11,18)
let timeobj = {days: 886, hours: 18, minutes: 57, seconds: 12}

describe('Date Utils', () => {

	it('timeDiff should return an object', async () => {

		expect(timeDiff()).toBeDefined()
		expect(timeDiff(timestamp, now.getTime())).toEqual(timeobj)
  })

	it('formatTimeDiff should return an string', async () => {

		expect(formatTimeDiff(timeobj)).toBeDefined()
		expect(formatTimeDiff(timeobj)).toEqual('886 days ago')
		expect(formatTimeDiff({seconds: 0, minutes: 0, hours: 0, days: 0})).toBeUndefined()
		expect(formatTimeDiff({seconds: 1, minutes: 1, hours: 0, days: 0})).toEqual('1 minute ago')
		expect(formatTimeDiff({seconds: 1, minutes: 1, hours: 2, days: 0})).toEqual('2 hours ago')
		expect(formatTimeDiff({seconds: 1, minutes: 1, hours: 2, days: 21})).toEqual('21 days ago')
  })
})
