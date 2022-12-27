module.exports = function mstohours(duration) {
  duration /= 1000;
  duration = duration.toFixed(0);

  let days = 0
  let hours = 0
  let minutes = 0
  let seconds = duration
  while (seconds >= 60) {
      minutes += 1
      seconds -= 60
  }
  while (minutes >= 60) {
      hours += 1
      minutes -= 60
  }
  while (hours >= 24) {
    days += 1
    hours -= 60
}
  if (minutes < 10) minutes = `0${minutes}`
  if (seconds < 10) seconds = `0${seconds}`

  if (days > 0)
      return `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos.`
  else if (hours > 0)
      return `${hours} horas, ${minutes} minutos e ${seconds} segundos.`
  else
      return `${minutes}:${seconds} minutos.`
}