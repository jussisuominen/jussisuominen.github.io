let working = false
let startDate
let endDate
// Total work time in milliseconds. This must be converted to hours, minutes and
// seconds when displaying hours, minutes and seconds that the user has worked.
let totalWorkTime = 0
let totalWorkTimeData = {}

console.log(getTodayString())

const storedTotalWorkTime = localStorage.getItem('total_work_time')

if(storedTotalWorkTime) {
  totalWorkTimeData = JSON.parse(storedTotalWorkTime)
}

if(totalWorkTimeData) {
  console.log(totalWorkTimeData[getTodayString()])
  if(totalWorkTimeData[getTodayString()]) {
    totalWorkTime = totalWorkTimeData[getTodayString()]
  }

  console.log(totalWorkTime)

  showTotalWorkTime()
}

function startWorking() {
  startDate = new Date()
  let date = startDate

  const hours = date.getHours()
  const minutes = date.getMinutes()

  workingTimeView.innerHTML += `You started working: ${getWorkTimeHTML(hours, minutes)}`

  startWorkingButton.innerHTML = '<h3>Stop working</h3>'

  working = true
}

function stopWorking() {
  console.log('Stop working')

  //startTimeView.innerHTML = '&nbsp;'

  endDate = new Date()

  const timeDifference = endDate - startDate
  const timeDifferenceInSeconds = Math.floor(timeDifference / 1000 ) % 60
  const timeDifferenceInMinutes = Math.floor(timeDifference / 1000 / 60) % 60
  const timeDifferenceInHours = Math.floor(timeDifference / 1000 / 60 / 60)  

  workingTimeView.innerHTML += `
    You stopped working: ${getWorkTimeHTML(endDate.getHours(), endDate.getMinutes())}. You worked: <strong>${timeDifferenceInHours} hours, ${timeDifferenceInMinutes} minutes and ${timeDifferenceInSeconds} seconds.</strong><br><br>`

  startWorkingButton.innerHTML = '<h3>Start working</h3>'

  totalWorkTime += timeDifference

  console.log(timeDifference)
  console.log(totalWorkTime)

  showTotalWorkTime()

  //startTimeView.innerHTML = ''

  working = false

  totalWorkTimeData = {}

  const today = getTodayString()

  totalWorkTimeData[today] = totalWorkTime
  localStorage.setItem('total_work_time', JSON.stringify(totalWorkTimeData))
}

startWorkingButton.addEventListener('click', () => {
  if(!working) {
    startWorking()
  } else {
    stopWorking()
  }
})

function showTotalWorkTime() {
  const totalWorkTimeInSeconds = Math.floor(totalWorkTime / 1000) % 60
  const totalWorkTimeInMinutes = Math.floor(totalWorkTime / 1000 / 60) % 60
  const totalWorkTimeInHours = Math.floor(totalWorkTime / 1000 / 60 / 60)

  console.log(totalWorkTimeInSeconds)

  totalWorkTimeView.innerHTML = `<hr>Total work time today: <strong>${totalWorkTimeInHours} h, ${totalWorkTimeInMinutes} m, ${totalWorkTimeInSeconds} s</strong>`
}

function getTodayString() {
  const date = new Date()
  const today = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  return today
}

function getWorkTimeHTML(hours, minutes) {
  if (minutes < 10) {
    minutes = '0' + minutes
  }

  return `<strong>${hours}</strong>:<strong>${minutes}</strong>`
}
