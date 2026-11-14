let search = document.querySelector('.menu_filter-input')
import { products } from './products.js'

// 1. Dark / Light Mode
let themeBtns = document.querySelectorAll('.nav_buttons-theme')

themeBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode')
        themeBtns.forEach((icon) => {
            icon.classList.toggle('active')
        })
    })
})

// 2. Mahsulotlarni ekranga chiqarish
let menuCards = document.querySelector('.menu_cards')

function renderProducts(list) {
    menuCards.innerHTML = ''

    // MUHIM: bu yerda products emas, parametr sifatida kelgan list aylanishi kerak
    list.forEach(function (item) {
        menuCards.innerHTML += `
            <div class="menu__card" data-id="${item.id}">
                <div class="menu_favourite">
                    <button class="menu-favourite">
                        <svg class="menu-favourite-svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M11.288 20.2q-.363-.125-.638-.4l-1.725-1.575q-2.65-2.425-4.787-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125t-.712-.125" />
                        </svg>
                        <svg class="menu-favourite-svg active" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M11.288 20.2q-.363-.125-.638-.4l-1.725-1.575q-2.65-2.425-4.787-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125t-.712-.125M11.05 6.75q-.725-1.025-1.55-1.562t-2-.538q-1.5 0-2.5 1t-1 2.5q0 1.3.925 2.763t2.213 2.837t2.65 2.575T12 18.3q.85-.775 2.213-1.975t2.65-2.575t2.212-2.837T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2 .538T12.95 6.75q-.175.25-.425.375T12 7.25t-.525-.125t-.425-.375m.95 4.725" />
                        </svg>
                    </button>
                </div>
                <div class="menu__card_about">
                    <img class="menu__card-img" src="${item.img}" alt="${item.name}">
                    <h3 class="menu__card-title">${item.name}</h3>
                    <p class="menu__card-text">${item.text}</p>
                </div>
                <div class="menu__card_price">
                    <p class="menu__card-price">$${item.price}</p>
                    <button class="menu__card-add">+</button>
                </div>
            </div>
        `
    })
}

// Sahifa ochilganda barcha mahsulotlarni chiqarish
renderProducts(products)

// 3. Kategoriya bo'yicha filter qilish
let filters = document.querySelectorAll('.menu__buttons-button')

filters.forEach((filter) => {
    filter.addEventListener('click', () => {
        filters.forEach((item) => item.classList.remove('active'))
        filter.classList.add('active')

        const category = filter.textContent.trim().toLowerCase()
        let filteredProducts = []

        if (category === 'all') {
            filteredProducts = products
        } else {
            filteredProducts = products.filter(function (item) {
                return item.category?.toLowerCase() === category
            })
        }

        renderProducts(filteredProducts)
        search.value = ''
    })

})

let noneResult = document.querySelector('.none-result')

search.addEventListener('input', function () {

    filters.forEach((filter) => {
        filter.classList.remove('active')
        if (filter.textContent.trim().toLowerCase() === 'all') {
            filter.classList.add('active')
        }
    })


    let searching = search.value.trim().toLowerCase()
    let searchedProducts = products.filter(function (item) {
        let title = item.name.toLowerCase().includes(searching)
        let text = item.text.toLowerCase().includes(searching)
        if (title || text) {
            return title || text
        }
        else {
            return noneResult.classList.add('active')
        }
    })
    renderProducts(searchedProducts)
})