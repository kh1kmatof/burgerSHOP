import { products } from './products.js'
import { renderProducts } from './render.js'

let clear = document.querySelector('#clear-input')

// Oddiy function ko'rinishi:
// export function initFilters() { ... }

export const initFilters = () => {
    let search = document.querySelector('.menu_filter-input')
    let filters = document.querySelectorAll('.menu__buttons-button')
    let noneResult = document.querySelector('.none_result')
    let menuSection = document.querySelector('#menu') // Menyu bo'limi (ekranni surish uchun)

    // --- 1. KATEGORIYA TUGMALARI BO'YICHA FILTER ---
    // Oddiy function ko'rinishi:
    // filters.forEach(function (filter) { ... })
    filters.forEach((filter) => {

        // Oddiy function ko'rinishi:
        // filter.addEventListener('click', function () { ... })
        filter.addEventListener('click', () => {

            // Hamma tugmalardan active klassini olib tashlaymiz
            // Oddiy function ko'rinishi:
            // filters.forEach(function (item) { ... })
            filters.forEach((item) => {
                item.classList.remove('active')
            })

            // Bosilgan tugmaga active beramiz
            filter.classList.add('active')

            const category = filter.textContent.trim().toLowerCase()
            let filteredProducts = []

            if (category === 'all') {
                filteredProducts = products
            } else {
                // Oddiy function ko'rinishi:
                // filteredProducts = products.filter(function (item) { ... })
                filteredProducts = products.filter((item) => {
                    return item.category?.toLowerCase() === category
                })
            }

            // "Hech narsa topilmadi" yozuvini yashiramiz
            noneResult.classList.remove('active')

            // Tanlangan mahsulotlarni ekranga chiqaramiz va qidiruvni tozalaymiz
            renderProducts(filteredProducts)
            search.value = ''
        })
    })



    // --- 2. SEARCH GA BOSILGANDA EKRANNI TEPAGA SURISH ---
    // Oddiy function ko'rinishi:
    // search.addEventListener('focus', function () { ... })
    search.addEventListener('focus', () => {
        menuSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })

    // --- 3. QIDIRUV (SEARCH) ORQALI FILTER ---
    // Oddiy function ko'rinishi:
    // search.addEventListener('input', function () { ... })
    search.addEventListener('input', () => {

        // Tugmalarni tekshiramiz: hammasidan active ni olib, faqat "All" ga beramiz
        // Oddiy function ko'rinishi:
        // filters.forEach(function (filter) { ... })
        filters.forEach((filter) => {
            filter.classList.remove('active')

            if (filter.textContent.trim().toLowerCase() === 'all') {
                filter.classList.add('active')
            }
        })

        let searching = search.value.trim().toLowerCase()

        // Oddiy function ko'rinishi:
        // let searchedProducts = products.filter(function (item) { ... })
        let searchedProducts = products.filter((item) => {
            let title = item.name.toLowerCase().includes(searching)
            let text = item.text.toLowerCase().includes(searching)
            return title || text
        })

        // Agar natija 0 ta bo'lsa "topilmadi" xabarini chiqaramiz, aks holda yashiramiz
        if (searchedProducts.length === 0) {
            noneResult.classList.add('active')
        } else {
            noneResult.classList.remove('active')
        }

        renderProducts(searchedProducts)
    })
}