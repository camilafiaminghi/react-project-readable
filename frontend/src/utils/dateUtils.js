export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')

  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function timeDiff (timestamp, now=new Date()) {
	let diff = {}
  const d1 = new Date(timestamp)
  const d2 = new Date(now)

  const d1Ms = d1.getTime()
  const d2Ms = d2.getTime()

  let diffMs = d2Ms - d1Ms

  diffMs = diffMs / 1000
  diff.seconds = Math.floor(diffMs % 60)

  diffMs = diffMs / 60
  diff.minutes = Math.floor(diffMs % 60)

  diffMs = diffMs / 60
  diff.hours = Math.floor(diffMs % 24)
  diff.days = Math.floor(diffMs / 24)

  return diff
}


export function formatTimeDiff (timeobj) {
	const {days, hours, minutes, seconds} = timeobj

	if (days > 0)
		return ((days > 0) ? ((days > 1) ? `${days} days` : `${days} day`) : '') + ' ago'
	if (hours > 0)
		return ((hours > 0) ? ((hours > 1) ? `${hours} hours` : `${hours} hour`) : '') + ' ago'
	if (minutes > 0)
		return ((minutes > 0) ? ((minutes > 1) ? `${minutes} minutes` : `${minutes} minute`) : '') + ' ago'
	if (seconds > 0)
		return ((seconds > 0) ? ((seconds > 1) ? `${seconds} seconds` : `${seconds} second`) : '') + ' ago'
}
