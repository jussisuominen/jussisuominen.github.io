const navItemStyle = 'nav-item mx-2 my-2 my-lg-0 bg-secondary rounded '

const navItems = {}

// Create navigation items.
pages.forEach(page => {
    const contentFile = page.toLowerCase().replaceAll(' ', '_')
    const navItem = document.createElement('li')

    navItem.classList = navItemStyle

    navItem.innerHTML = `<a class="nav-link text-light" href="#${contentFile}">
    ${page}</a>`
    navItem.onclick = async () => {
        // Check if user is using a mobile/small device.
        if (window.innerWidth < 992) {
            // Close the mobile navigation menu by "clicking" navbar toggler
            // button programmatically (clicking navbar toggler button closes
            // the mobile navigation menu)
            navbarTogglerButton.click()
        }
        await openPage(page, contentFile)
    }

    navbarNavElement.appendChild(navItem)
})

// Add link for the relaxation exercise. 
// Lisää linkki rentoutusharjoitukseen.
// Code needs to be refactored!!
const relaxationNavItem = document.createElement('li')

relaxationNavItem.classList = navItemStyle

relaxationNavItem.innerHTML = `<a class="nav-link text-light" href="rentoutus/index.html" target="_blank">Rentoutusharjoitus</a>`

navbarNavElement.appendChild(relaxationNavItem)

// async function showAllPages() {
//     await openPage('Tervetuloa kotisivuilleni!', 'etusivu')
//     await openPage('Tietoja minusta', 'tietoja_minusta')
//     await openPage('Portfolio (ohjelmistokehitys)', 'portfolio')
//     await openPage('Koodaus', 'koodaus')
//     await openPage('Linkit', 'linkit')
//     await openPage('Musiikki', 'musiikki')
// }

async function showHomepage() {
    await openPage('Tietoja minusta', 'tietoja_minusta')
}

showHomepage()