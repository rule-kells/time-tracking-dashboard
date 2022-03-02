const container = document.querySelector('.container')
const reportTabsList = container.querySelector('.activity__report--tabs')
const reportTabs = [...container.querySelectorAll('.activity__report--tab')]
const activityStats = container.querySelector('.activity__stats')
const reportStatsContent = [
  ...container.querySelectorAll('.activity__stats--content'),
]

reportTabsList.addEventListener('click', (e) => {
  const tab = e.target.closest('li')

  if (!tab) return
  clickedTabIndex = reportTabs.findIndex((t) => t === tab)
  const activeStatsContent = reportStatsContent[clickedTabIndex]
  const activeStats = activityStats.querySelector('.active')
  activeStats.classList.remove('active')
  reportStatsContent.forEach((c) => c.classList.remove('active'))
  activeStatsContent.classList.add('active')

  reportTabs.forEach((t) => {
    t.classList.remove('active')
  })
  tab.classList.add('active')
})
