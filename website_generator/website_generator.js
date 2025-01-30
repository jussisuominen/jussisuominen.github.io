const fileSystem = require('fs')

// Configuration for the app.
// File used for layout file. If you want to use a different file
// for the layout change this.
const layoutFile = './layout.html'
const navigationFile = './navigation.html'
// Markup that's used to define where content portion of the page
// is to be added.
const contentMarkup = '{{ content }}'
const navigationMarkup = '{{ navigation }}'
const pageTitleMarkup = '{{ page_title }}'
// Output path specifies where web site generator generates the
// HTML files of the web page. Output path must end with "/".
const outputPath = '../'

// Read the layout file.
const layout = fileSystem.readFileSync(layoutFile).toString()
// Read the navigation file.
const navigation = fileSystem.readFileSync(navigationFile).toString()

function generatePage(page, pageTitle) {
    // Content file name. 
    const contentFile = `./${page}.html`

    // Read the content file. Filename is ${page}.html. For example if
    // page argument is "index" the content/generated file will be index.html.
    const contents = fileSystem.readFileSync(contentFile).toString()

    // Replace {{ contents }} string in layout file with contents.
    const webPage = layout
            .replace(contentMarkup, contents)
            .replace(navigationMarkup, navigation)
            .replace(pageTitleMarkup, pageTitle)


    // Create HTML page file.
    fileSystem.writeFileSync(`${outputPath}${page}.html`, webPage)

    console.log(`${outputPath}${page}.html generated successfully :)`)
}

generatePage('index', 'Tervetuloa kotisivuilleni!')
generatePage('portfolio', 'Portfolio (ohjelmistokehitys)')
generatePage('tietoja_minusta', 'Tietoja minusta')
generatePage('koodaus', 'Koodaus')
generatePage('linkit', 'Linkit')
generatePage('musiikki', 'Musiikki (GarageBand)')