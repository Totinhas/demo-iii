export const formatTime = (time) => {
  const ms = time % 1000
  const ss = Math.floor(time / 1000) % 60
  const mins = Math.floor(time / 60000)
  return `${padLeftWithZeroes(2, mins)}:${padLeftWithZeroes(
    2,
    ss,
  )}:${padLeftWithZeroes(3, ms)}`
}

export const padLeftWithChar = (char, pos, str) =>
  (char.repeat(pos) + str).slice(-pos)

export const padLeftWithZeroes = (pos, str) => padLeftWithChar('0', pos, str)
