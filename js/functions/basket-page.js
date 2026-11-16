import { initTheme } from './theme.js'
import { products } from './products.js'
import {
    getBasket,
    addToBasket,
    decreaseFromBasket,
    removeFromBasket,
    clearBasket,
    updateBasketBadge
} from './basket.js'

initTheme()
updateBasketBadge()

let basketWrapper = document.querySelector('#basketWrapper')
let basketListEl = document.querySelector('#basketList')
let emptyBasket = document.querySelector('#emptyBasket')
let subtotalPriceEl = document.querySelector('#subtotalPrice')
let totalPriceEl = document.querySelector('#totalPrice')
let checkoutBtn = document.querySelector('#checkoutBtn')
let clearBasketBtn = document.querySelector('#clearBasketBtn')

// Savatcha sahifasini chizuvchi asosiy funksiya
// Oddiy function ko'rinishi:
// function renderBasketPage() { ... }
const renderBasketPage = () => {
    let basketItems = getBasket()

    if (basketItems.length === 0) {
        basketWrapper.style.display = 'none'
        emptyBasket.style.display = 'flex'
        return
    }

    basketWrapper.style.display = 'grid'
    emptyBasket.style.display = 'none'
    basketListEl.innerHTML = ''

    let totalSum = 0

    basketItems.forEach((item) => {
        let product = products.find((p) => {
            return p.id === item.id
        })

        if (product) {
            let itemTotal = product.price * item.count
            totalSum += itemTotal

            basketListEl.innerHTML += `
                <div class="basket_item" data-id="${product.id}">
                    <div class="basket_item-info">
                        <img class="basket_item-img" src="${product.img}" alt="${product.name}">
                        <div>
                            <h3 class="basket_item-title">${product.name}</h3>
                            <p class="basket_item-unit">$${product.price} each</p>
                        </div>
                    </div>

                    <div class="basket_item-controls">
                        <button class="basket_qty-btn minus-btn">-</button>
                        <span class="basket_item-count">${item.count}</span>
                        <button class="basket_qty-btn plus-btn">+</button>
                    </div>

                    <p class="basket_item-total">$${itemTotal}</p>
                    <button class="basket_item-remove" title="Remove item">✕</button>
                </div>
            `
        }
    })

    subtotalPriceEl.textContent = `$${totalSum}`
    totalPriceEl.textContent = `$${totalSum}`

    // Tugmalarga hodisalar ulaymiz
    attachBasketEvents()
}

// +, - va O'chirish tugmalarini ishlatish
// Oddiy function ko'rinishi:
// function attachBasketEvents() { ... }
const attachBasketEvents = () => {
    let plusBtns = basketListEl.querySelectorAll('.plus-btn')
    let minusBtns = basketListEl.querySelectorAll('.minus-btn')
    let removeBtns = basketListEl.querySelectorAll('.basket_item-remove')

    plusBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            let id = Number(btn.closest('.basket_item').dataset.id)
            addToBasket(id)
            renderBasketPage()
        })
    })

    minusBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            let id = Number(btn.closest('.basket_item').dataset.id)
            decreaseFromBasket(id)
            renderBasketPage()
        })
    })

    removeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            let id = Number(btn.closest('.basket_item').dataset.id)
            removeFromBasket(id)
            renderBasketPage()
        })
    })
}

// Savatchani tozalash tugmasi
clearBasketBtn.addEventListener('click', () => {
    clearBasket()
    renderBasketPage()
})

// Zakaz berish tugmasi
checkoutBtn.addEventListener('click', () => {
    alert('Buyurtmangiz qabul qilindi! 15 daqiqada yetkazib beramiz 🍔🔥')
    clearBasket()
    renderBasketPage()
})

renderBasketPage()