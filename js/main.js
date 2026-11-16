import { products } from './functions/products.js'
import { initTheme } from './functions/theme.js'
import { renderProducts } from './functions/render.js'
import { initFilters } from './functions/filter.js'
import { initScrollSpy } from './functions/scroll.js'
import { initHeroSlider } from './functions/slider.js'
import { updateBasketBadge } from './functions/basket.js' // main.js da './functions/basket.js'

// 1. Tungi va kunduzgi rejimni ishga tushiramiz
initTheme()

// 2. Sahifa ochilganda barcha mahsulotlarni ekranga chiqaramiz
renderProducts(products)

// 3. Kategoriya va qidiruv filtrlarini ishga tushiramiz
initFilters()

initScrollSpy()

initHeroSlider()

updateBasketBadge()