function card(title, content) {
    const cardContainer = document.createElement('div')

    cardContainer.className = 'card'
    cardContainer.innerHTML = 
    `<div class="card-header bg-dark text-light">
            <h3>
                ${title}
            </h3>   
        </div>
        <div class="card-body" style="background: #eee">
            <div class="card-text">
                ${content}
            </div>
        </div>
    </div>`

    return cardContainer
}