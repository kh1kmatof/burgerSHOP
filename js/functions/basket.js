import { products } from './products.js'

// 1. Xotiradan savatcha ro'yxatini olish
// Oddiy function ko'rinishi:
// export function getBasket() { ... }
export const getBasket = () => {
    let saved = localStorage.getItem('basket')

    if (saved) {
        return JSON.parse(saved)
    } else {
        return []
    }
}

// 2. Savatchani xotiraga saqlash va tepadagi summani yangilash
// Oddiy function ko'rinishi:
// export function saveBasket(basketList) { ... }
export const saveBasket = (basketList) => {
    localStorage.setItem('basket', JSON.stringify(basketList))
    updateBasketBadge()
}

// 3. Savatchaga mahsulot qo'shish (+ tugmasi)
// Oddiy function ko'rinishi:
// export function addToBasket(id) { ... }
export const addToBasket = (id) => {
    let basketList = getBasket()

    // Mahsulot savatchada oldin bormi-yo'qmi tekshiramiz
    let existingItem = basketList.find((item) => {
        return item.id === id
    })

    if (existingItem) {
        existingItem.count += 1
    } else {
        basketList.push({
            id: id,
            count: 1
        })
    }

    saveBasket(basketList)
}

// 4. Mahsulot sonini 1 taga kamaytirish (- tugmasi)
// Oddiy function ko'rinishi:
// export function decreaseFromBasket(id) { ... }
export const decreaseFromBasket = (id) => {
    let basketList = getBasket()

    let existingItem = basketList.find((item) => {
        return item.id === id
    })

    if (existingItem) {
        existingItem.count -= 1

        // Agar soni 0 ga tushsa, ro'yxatdan butunlay o'chiramiz
        if (existingItem.count <= 0) {
            basketList = basketList.filter((item) => {
                return item.id !== id
            })
        }
    }

    saveBasket(basketList)
}

// 5. Mahsulotni savatchadan butunlay o'chirish (X tugmasi)
// Oddiy function ko'rinishi:
// export function removeFromBasket(id) { ... }
export const removeFromBasket = (id) => {
    let basketList = getBasket()

    basketList = basketList.filter((item) => {
        return item.id !== id
    })

    saveBasket(basketList)
}

// 6. Savatchani to'liq tozalash
// Oddiy function ko'rinishi:
// export function clearBasket() { ... }
export const clearBasket = () => {
    localStorage.removeItem('basket')
    updateBasketBadge()
}

// 7. Tepa menyudagi savatcha summasini (0$) hisoblab yangilash
// Oddiy function ko'rinishi:
// export function updateBasketBadge() { ... }
export const updateBasketBadge = () => {
    let basketSpan = document.querySelector('.nav_buttons-basket span')
    if (!basketSpan) return

    let basketList = getBasket()
    let totalMoney = 0

    basketList.forEach((basketItem) => {
        let product = products.find((p) => {
            return p.id === basketItem.id
        })

        if (product) {
            totalMoney += product.price * basketItem.count
        }
    })

    basketSpan.textContent = `${totalMoney}$`
}