

import { initTheme } from './theme.js'
import { products } from './products.js'
import { getFavourites } from './favourites.js'
import { renderProducts } from './render.js'
import { updateBasketBadge } from './basket.js' // main.js da './functions/basket.js'
// 1. Dark/Light rejimni yoqamiz
initTheme()

let favCards = document.querySelector('#favCards')
let emptyFav = document.querySelector('#emptyFav')

function showFavourites() {
    // 2. Xotiradan tanlangan ID larni olamiz
    let favIds = getFavourites()

    // 3. Faqat ID si ro'yxatda bor mahsulotlarni filtrlab olamiz
    let favProducts = products.filter(function (item) {
        return favIds.includes(item.id)
    })

    // 4. Agar ro'yxat bo'sh bo'lsa "No favourites" chiqsin, bo'lmasa kartochkalar
    if (favProducts.length === 0) {
        favCards.style.display = 'none'
        emptyFav.style.display = 'flex'
    } else {
        favCards.style.display = 'grid'
        emptyFav.style.display = 'none'
        renderProducts(favProducts)
    }
}

showFavourites()

updateBasketBadge()