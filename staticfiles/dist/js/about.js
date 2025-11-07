document.getElementById('year').textContent = new Date().getFullYear()
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})