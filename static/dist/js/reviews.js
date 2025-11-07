// 📌 Footer year
document.getElementById('year').textContent = new Date().getFullYear()

// 📌 Back to top button
document.getElementById('backToTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})

// 📌 Star rating logic
let selectedRating = 0
document.querySelectorAll('#starRating .star').forEach((star) => {
    star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.value)
        updateStars(selectedRating)
    })
})

function updateStars(rating) {
    document.querySelectorAll('#starRating .star').forEach((star) => {
        star.style.color = parseInt(star.dataset.value) <= rating ? 'gold' : 'gray'
    })
}

// 📌 Submit review
document.getElementById('reviewForm').addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.getElementById('name').value.trim()
    const role = document.getElementById('role').value
    const message = document.getElementById('message').value.trim()

    // Validation with alerts
    if (name.length < 3) {
        alert("Name must be at least 3 characters")
        return
    }
    if (!role) {
        alert("Please select a role")
        return
    }
    if (message.length < 10) {
        alert("Review must be at least 10 characters")
        return
    }
    if (selectedRating === 0) {
        alert("Please select a rating")
        return
    }

    // Create review object
    const review = {
        name,
        role,
        message,
        rating: selectedRating,
        timestamp: Date.now()
    }

    // Save into localStorage
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]')
    reviews.push(review)
    localStorage.setItem('reviews', JSON.stringify(reviews))

    // Reset form
    e.target.reset()
    selectedRating = 0
    updateStars(0)

    renderReviews()
})

// 📌 Filters
document.getElementById('filterRole').addEventListener('change', renderReviews)
document.getElementById('filterRating').addEventListener('change', renderReviews)

// 📌 Render reviews
function renderReviews() {
    const container = document.getElementById('reviewsContainer')
    container.innerHTML = ''
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]')
    const roleFilter = document.getElementById('filterRole').value
    const ratingFilter = parseInt(document.getElementById('filterRating').value)

    reviews
        .filter((r) => !roleFilter || r.role === roleFilter)
        .filter((r) => !ratingFilter || r.rating >= ratingFilter)
        .sort((a, b) => b.timestamp - a.timestamp)
        .forEach((r) => {
            const card = document.createElement('div')
            card.className = 'review-card'
            card.innerHTML = `
                <h5>${r.name} <small class="text-muted">(${r.role})</small></h5>
                <p>${r.message}</p>
                <div>${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
            `
            card.style.opacity = 0
            container.appendChild(card)
            setTimeout(() => (card.style.opacity = 1), 100)
        })
}

// 📌 Sample reviews
const sampleReviews = [
    {
        name: 'Aarav Mehta',
        role: 'Student',
        message: 'AcademiaX makes managing my coursework so smooth. I especially love the autosave feature!',
        rating: 5,
        timestamp: Date.now() - 1000000
    },
    {
        name: 'Dr. Neha Kapoor',
        role: 'Faculty',
        message: 'The dashboard is intuitive and saves me hours every week. Great job on the modular design!',
        rating: 4,
        timestamp: Date.now() - 900000
    },
    {
        name: 'Ravi Sharma',
        role: 'HOD',
        message: "Finally a system that feels tailored to our department's needs. The search and filter logic is a game changer.",
        rating: 5,
        timestamp: Date.now() - 800000
    },
    {
        name: 'Sneha Roy',
        role: 'Student',
        message: 'I love how responsive the layout is on mobile. Feels premium!',
        rating: 4,
        timestamp: Date.now() - 700000
    },
    {
        name: 'Prof. Anil Verma',
        role: 'Faculty',
        message: 'Toast notifications and validation make the experience feel polished. Impressive work!',
        rating: 5,
        timestamp: Date.now() - 600000
    }
]

// 📌 Merge sample + stored reviews without duplicating
let storedReviews = JSON.parse(localStorage.getItem('reviews') || '[]')

// Only add samples the first time if no reviews exist
if (storedReviews.length === 0) {
    localStorage.setItem('reviews', JSON.stringify([...sampleReviews]))
} else {
    // Merge user reviews + sample reviews only once
    const allReviews = [...sampleReviews, ...storedReviews]
    localStorage.setItem('reviews', JSON.stringify(allReviews))
}

renderReviews()
