export const readableTimestamp = (javaTimestamp) => {
  const timestamp = new Date(javaTimestamp)
  const pad = (n, s = 2) => `${new Array(s).fill(0)}${n}`.slice(-s)

  return `${pad(timestamp.getDate())}-${pad(timestamp.getMonth() + 1)}-${pad(
    timestamp.getFullYear(),
    4,
  )}`
}

export const readableTimestampWithTime = (javaTimestamp) => {
  const timestamp = new Date(javaTimestamp)
  const pad = (n, s = 2) => `${new Array(s).fill(0)}${n}`.slice(-s)

  return `${pad(timestamp.getFullYear(), 4)}-${pad(timestamp.getMonth() + 1)}-${pad(
    timestamp.getDate(),
  )} ${pad(timestamp.getHours())}:${pad(timestamp.getMinutes())}:${pad(timestamp.getSeconds())}`
}

export const phoneNumberFormatView = (phoneNumberString) => {
  let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  let match1 = cleaned.match(/^(90|)?(\d{4})(\d{3})(\d{2})(\d{2})$/)
  let match2 = cleaned.match(/^(90|)?(\d{3})(\d{3})(\d{2})(\d{2})$/)
  if (match1) {
    let intlCode = match1[1] ? '+90 ' : ''
    return [intlCode, match1[2], ' ', match1[3], ' ', match1[4], ' ', match1[5]].join('')
  } else if (match2) {
    let intlCode = match2[1] ? '+90 0' : ''
    return [intlCode, match2[2], ' ', match2[3], ' ', match2[4], ' ', match2[5]].join('')
  }
  return null
}
