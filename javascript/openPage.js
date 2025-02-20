async function openPage(pageTitle, contentFile) {
    const response = await fetch('./content/' + contentFile + '.html')

    if(!response.ok) {
        alert(response.statusText)
        return
    }

    const data = await response.text()
    const cardElement = card(pageTitle, data, contentFile)
    // mainElement.innerHTML = ''

    const sizedBox = document.createElement('p')

    sizedBox.style.height = window.height
    sizedBox.style.width = '100%'
    sizedBox.style.display = 'inline-block'
    sizedBox.innerHTML = '<br><br>'

    const sizedBox2 = document.createElement('p')
    sizedBox2.id = contentFile
    sizedBox2.style.width = '100%'
    sizedBox2.style.display = 'inline-block'
    sizedBox2.innerHTML = ''

    mainElement.appendChild(sizedBox2)
    mainElement.appendChild(sizedBox)
    mainElement.appendChild(cardElement)
}