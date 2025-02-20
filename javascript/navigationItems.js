const navItemStyle = "nav-item mx-2 my-2 my-lg-0 bg-secondary rounded ";

const navItems = {};

function createNavigationItems() {
    // Create navigation items.
pages.forEach((page) => {
    const contentFile = page.toLowerCase().replaceAll(" ", "_");
    const navItem = document.createElement("li");
  
    navItem.classList = navItemStyle;
  
    navItem.innerHTML = `<a class="nav-link text-light" href="#${contentFile}">
      ${page}</a>`;
    navItem.onclick = async () => {
        // Check if user is using a mobile/small device.
        if (window.innerWidth < 992) {
            // Close the mobile navigation menu by "clicking" navbar toggler
            // button programmatically (clicking navbar toggler button closes
            // the mobile navigation menu)
            navbarTogglerButton.click()
        }
      //   await openPage(page, contentFile)
    }
  
    navbarNavElement.appendChild(navItem);
  });
}