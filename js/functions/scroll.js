// Oddiy function ko'rinishi:
// export function initScrollSpy() { ... }

export const initScrollSpy = () => {
    let navLinksContainer = document.querySelector('.nav_links')
    let navLinks = document.querySelectorAll('.nav_links-link')
    let menuSection = document.querySelector('#menu')

    // Chiziqni (::after) kerakli tugma ostiga surib qo'yuvchi funksiya
    // Oddiy function ko'rinishi:
    // function moveIndicator(activeLink) { ... }
    const moveIndicator = (activeLink) => {
        if (activeLink) {
            navLinksContainer.style.setProperty('--after-left', `${activeLink.offsetLeft}px`)
            navLinksContainer.style.setProperty('--after-width', `${activeLink.offsetWidth}px`)
        }
    }

    // 1. Sahifa birinchi ochilganda chiziqni active turgan tugma (Home) ostiga qo'yamiz
    let initialActive = document.querySelector('.nav_links-link.active')
    moveIndicator(initialActive)

    // 2. Sahifa pastga yoki tepaga surilganda (scroll) kuzatamiz
    // Oddiy function ko'rinishi:
    // window.addEventListener('scroll', function () { ... })
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY
        let windowHeight = window.innerHeight
        let fullPageHeight = document.documentElement.scrollHeight

        // Hozir qaysi bo'limda turganimizni saqlovchi o'zgaruvchi
        let currentSection = 'home'

        // 1-SHART: Ekran eng ostiga (Footer ga) yetib bordimi?
        if (windowHeight + scrollPosition >= fullPageHeight - 20) {
            currentSection = 'footer'
        } 
        // 2-SHART: Menu bo'limiga yetib keldikmi?
        else if (scrollPosition >= menuSection.offsetTop - 200) {
            currentSection = 'menu'
        } 
        // 3-SHART: Aks holda biz eng tepada (Home bo'limida) turibmiz
        else {
            currentSection = 'home'
        }

        // Barcha linklarni aylanib chiqib, mos kelganiga active beramiz va chiziqni suramiz
        // Oddiy function ko'rinishi:
        // navLinks.forEach(function (link) { ... })
        navLinks.forEach((link) => {
            link.classList.remove('active')

            // href="#menu" dan "#" belgisini olib tashlab, "menu" so'zini olamiz
            let linkTarget = link.getAttribute('href').replace('#', '')

            if (linkTarget === currentSection) {
                link.classList.add('active')
                moveIndicator(link)
            }
        })
    })
}