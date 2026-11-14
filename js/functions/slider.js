import { products } from './products.js'

export const initHeroSlider = () => {
    let heroProducts = products.slice(0, 4)
    let currentIndex = 0
    let autoPlayInterval

    let titleFirst = document.querySelector('#heroTitleFirst')
    let titleSecond = document.querySelector('#heroTitleSecond')
    let heroText = document.querySelector('#heroText')
    let heroPrice = document.querySelector('#heroPrice')
    let heroImg = document.querySelector('#heroImg')
    let slideCount = document.querySelector('#heroSlideCount')

    let prevBtn = document.querySelector('#heroPrevBtn')
    let nextBtn = document.querySelector('#heroNextBtn')
    let animatedElements = document.querySelectorAll('.hero-animate')

    const updateHeroContent = () => {
        let currentItem = heroProducts[currentIndex]
        if (!currentItem) return

        let words = currentItem.name.toUpperCase().split(' ')

        if (words.length > 1) {
            let lastWord = words.pop()
            if (titleFirst) titleFirst.textContent = words.join(' ')
            if (titleSecond) titleSecond.textContent = lastWord + '.'
        } else {
            if (titleFirst) titleFirst.textContent = currentItem.name.toUpperCase()
            if (titleSecond) titleSecond.textContent = 'SPECIAL.'
        }

        if (heroText) heroText.textContent = currentItem.text
        if (heroPrice) heroPrice.textContent = `$${currentItem.price}`
        if (heroImg) {
            heroImg.src = currentItem.img
            heroImg.alt = currentItem.name
        }

        if (slideCount) {
            slideCount.innerHTML = `<span>${currentIndex + 1}</span>/${heroProducts.length} products`
        }
    }

    const changeSlide = (direction) => {
        animatedElements.forEach((el) => {
            if (direction === 'next') {
                el.classList.add('to-left')
            } else {
                el.classList.add('to-right')
            }
        })

        setTimeout(() => {
            updateHeroContent()

            animatedElements.forEach((el) => {
                el.style.transition = 'none'
                el.classList.remove('to-left')
                el.classList.remove('to-right')

                if (direction === 'next') {
                    el.classList.add('to-right')
                } else {
                    el.classList.add('to-left')
                }
            })

            setTimeout(() => {
                animatedElements.forEach((el) => {
                    el.style.transition = ''
                    el.classList.remove('to-right')
                    el.classList.remove('to-left')
                })
            }, 20)
        }, 250)
    }

    const goNext = () => {
        currentIndex++

        if (currentIndex >= heroProducts.length) {
            currentIndex = 0
        }

        changeSlide('next')
    }

    const goPrev = () => {
        currentIndex--

        if (currentIndex < 0) {
            currentIndex = heroProducts.length - 1
        }

        changeSlide('prev')
    }

    const startAutoPlay = () => {
        clearInterval(autoPlayInterval)

        autoPlayInterval = setInterval(() => {
            goNext()
        }, 3000)
    }

    updateHeroContent()
    startAutoPlay()

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goNext()
            startAutoPlay()
        })
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goPrev()
            startAutoPlay()
        })
    }
}