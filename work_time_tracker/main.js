const labels = {
  title: 'Työskentelyajan seuranta',
  workTimeData: 'Työskentelyajat',
  workStarted: 'Aloitit työskentelyn',
  startWorking: 'Aloita työskentely',
  stopWorking: 'Lopeta työskentely',
  totalWorkTimeToday: 'Työskentelyaika tänään',
  youWorked: 'Työskentelit',
  hours: 'tuntia',
  youStoppedWorking: 'Lopetit työskentelyn',
  and: 'ja',
  seconds: 'sekuntia',
  minutes: 'minuuttia'
}

let working = false
let startDate
let endDate
// Total work time today in milliseconds. This must be converted to hours, minutes and
// seconds when displaying hours, minutes and seconds that the user has worked.
let totalWorkTimeToday = 0
let totalWorkTimeData = {}

// Do these things when user starts the app
// Initialize labels
titleLabel.textContent = labels.title
workTimeDataLabel.textContent = labels.workTimeData
startWorkingButton.innerHTML = `<h3>${labels.startWorking}</h3>`

const workingTimeViewData = localStorage.getItem(`workingTimeView_${getTodayString()}`)

const localStorageKeys = Object.keys(localStorage)

console.log(localStorageKeys)

if(workingTimeViewData) {
  workingTimeView.innerHTML = localStorage.getItem(`workingTimeView_${getTodayString()}`)
}

// console.log(getTodayString())

const storedTotalWorkTime = localStorage.getItem('total_work_time')

if(storedTotalWorkTime) {
  totalWorkTimeData = JSON.parse(storedTotalWorkTime)
}

if(totalWorkTimeData) {
  console.log(totalWorkTimeData[getTodayString()])
  if(totalWorkTimeData[getTodayString()]) {
    totalWorkTimeToday = totalWorkTimeData[getTodayString()]
  }

  console.log(totalWorkTimeToday)

  showTotalWorkTime()
}

// Event listeners
startWorkingButton.addEventListener('click', () => {
  if(!working) {
    startWorking()
  } else {
    stopWorking()
  }
})

function startWorking() {
  startDate = new Date()
  let date = startDate

  const hours = date.getHours()
  const minutes = date.getMinutes()

  workingTimeView.innerHTML += `${labels.workStarted}: ${getWorkTimeHTML(hours, minutes)}.`

  startWorkingButton.innerHTML = `<h3>${labels.stopWorking}</h3>`

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
    ${labels.youStoppedWorking}: ${getWorkTimeHTML(endDate.getHours(), endDate.getMinutes())}. ${labels.youWorked}: <strong>${timeDifferenceInHours} ${labels.hours}, ${timeDifferenceInMinutes} ${labels.minutes} ${labels.and} ${timeDifferenceInSeconds} ${labels.seconds}.</strong><br><br>`

  localStorage.setItem(`workingTimeView_${getTodayString()}`, workingTimeView.innerHTML)

  startWorkingButton.innerHTML = `<h3>${labels.startWorking}</h3>`

  totalWorkTimeToday += timeDifference

  console.log(timeDifference)
  console.log(totalWorkTimeToday)

  showTotalWorkTime()

  //startTimeView.innerHTML = ''

  working = false

  totalWorkTimeData = {}

  saveTotalWorkTime()
}

function saveTotalWorkTime() {
  const today = getTodayString()
  totalWorkTimeData[today] = totalWorkTimeToday
  localStorage.setItem('total_work_time', JSON.stringify(totalWorkTimeData))
}

function showTotalWorkTime() {
  const totalWorkTimeInSeconds = Math.floor(totalWorkTimeToday / 1000) % 60
  const totalWorkTimeInMinutes = Math.floor(totalWorkTimeToday / 1000 / 60) % 60
  const totalWorkTimeInHours = Math.floor(totalWorkTimeToday / 1000 / 60 / 60)

  console.log(totalWorkTimeInSeconds)

  totalWorkTimeTodayView.innerHTML = `<hr>${labels.totalWorkTimeToday}: <strong>${totalWorkTimeInHours} ${labels.hours}, ${totalWorkTimeInMinutes} ${labels.minutes} ${labels.and} ${totalWorkTimeInSeconds} ${labels.seconds}</strong>`
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
