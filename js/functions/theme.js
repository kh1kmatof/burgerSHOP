// Oddiy function ko'rinishi:
// export function initTheme() { ... }

export const initTheme = () => {
    let themeBtns = document.querySelectorAll('.nav_buttons-theme')

    // Oddiy function ko'rinishi:
    // themeBtns.forEach(function (btn) { ... })
    themeBtns.forEach((btn) => {

        // Oddiy function ko'rinishi:
        // btn.addEventListener('click', function () { ... })
        btn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode')

            // Oddiy function ko'rinishi:
            // themeBtns.forEach(function (icon) { ... })
            themeBtns.forEach((icon) => {
                icon.classList.toggle('active')
            })
        })
    })
}