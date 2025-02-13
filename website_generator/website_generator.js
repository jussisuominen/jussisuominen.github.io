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

function generatePage(page, pageTitle) {
    // Read the layout file.
    const layout = fileSystem.readFileSync(layoutFile).toString()

    // Read the navigation file.
    const navigation = fileSystem.readFileSync(navigationFile).toString()

    // Content file name. 
    const contentFile = `./${page}.html`

    // Read the content file. Filename is ${page}.html. For example if
    // page argument is "index" the content/generated file will be index.html.
    const contents = fileSystem.readFileSync(contentFile).toString()

    // Replace {{ contents }} string in layout file with contents.
    const webPage = layout
            .replace('{{ content }}', contents)
            .replace(navigationMarkup, navigation)
            .replace('{{ page_title }}', pageTitle)


    // Create HTML page file.
    fileSystem.writeFileSync(`${outputPath}${page}.html`, webPage)

    console.log(`${pageTitle} (${outputPath}${page}.html) generated successfully :)`)
}

function generateWebSite() {
    generatePage('index', 'Tervetuloa kotisivuilleni!')
    generatePage('portfolio', 'Portfolio (ohjelmistokehitys)')
    generatePage('tietoja_minusta', 'Tietoja minusta')
    generatePage('koodaus', 'Koodaus')
    generatePage('linkit', 'Linkit')
    generatePage('musiikki', 'Musiikki (GarageBand)')
}

generateWebSite()

fileSystem.watch('./', function (event, filename) {
    if(filename === 'website_generator.js') return
    
    if(filename === 'index.html') {
        generatePage('index', 'Tervetuloa kotisivuilleni!')
    }
    else if(filename === 'portfolio.html') {
        generatePage('portfolio', 'Portfolio (ohjelmistokehitys)')
    }
    else if(filename === 'tietoja_minusta.html') {
        generatePage('tietoja_minusta', 'Tietoja minusta')
    }
    else if(filename === 'koodaus.html') {
        generatePage('koodaus', 'Koodaus')
    }
    else if(filename === 'linkit.html') {
        generatePage('linkit', 'Linkit')
    }
    else if(filename === 'musiikki.html') {
        generatePage('musiikki', 'Musiikki (GarageBand)')
    }
    else {
        generateWebSite()
    }

    console.log('Website updated!')
});