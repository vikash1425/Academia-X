const searchInput = document.getElementById('faqSearch')
const categorySelect = document.getElementById('faqCategory')
const faqItems = document.querySelectorAll('.accordion-item')

function filterFAQs() {
    const searchTerm = searchInput.value.toLowerCase()
    const selectedCategory = categorySelect.value

    faqItems.forEach((item) => {
        const text = item.textContent.toLowerCase()
        const category = item.getAttribute('data-category')

        const matchesSearch = text.includes(searchTerm)
        const matchesCategory = selectedCategory === 'all' || category === selectedCategory

        item.style.display = matchesSearch && matchesCategory ? 'block' : 'none'
    })
}

searchInput.addEventListener('input', filterFAQs)
categorySelect.addEventListener('change', filterFAQs)
document.getElementById('year').textContent = new Date().getFullYear()
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})