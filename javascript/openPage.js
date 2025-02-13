async function openPage(pageTitle, contentFile) {
    const response = await fetch(contentFile + '.html')
    const data = await response.text()
    const cardElement = card(pageTitle, data, contentFile)
    mainElement.innerHTML = ''
    mainElement.appendChild(cardElement)
}