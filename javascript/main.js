async function showAllPages() {
    // await openPage('Tervetuloa kotisivuilleni!', 'etusivu')
    // await openPage('Sovellukset', 'sovellukset')
    await openPage('Tietoja minusta', 'tietoja_minusta')
    // await openPage('Portfolio (ohjelmistokehitys)', 'portfolio')
    // await openPage('Koodaus', 'koodaus')
    // await openPage('Linkit', 'linkit')
    // await openPage('Musiikki', 'musiikki')
}

createNavigationItems()
showAllPages()