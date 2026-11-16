// 1. Brauzer xotirasidan saqlangan ID lar ro'yxatini olish
export function getFavourites() {
    let saved = localStorage.getItem('favourites')

    if (saved) {
        return JSON.parse(saved)
    } else {
        return []
    }
}

// 2. Yurakcha bosilganda ID ni ro'yxatga qo'shish yoki olib tashlash
export function toggleFavourite(id) {
    let favList = getFavourites()

    // Agar bu id ro'yxatda allaqachon bor bo'lsa — o'chiramiz
    if (favList.includes(id)) {
        favList = favList.filter(function (itemId) {
            return itemId !== id
        })
    } else {
        // Aks holda — ro'yxatga qo'shamiz
        favList.push(id)
    }

    // Yangilangan ro'yxatni xotiraga qayta yozamiz
    localStorage.setItem('favourites', JSON.stringify(favList))
}