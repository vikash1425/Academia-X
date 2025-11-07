document.getElementById('year').textContent = new Date().getFullYear()
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})
const bootstrapForm = document.getElementById('contactForm')
bootstrapForm.addEventListener('submit', function (event) {
    if (!bootstrapForm.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    } else {
        event.preventDefault()
        alert('Message sent successfully!')
        bootstrapForm.reset()
        bootstrapForm.classList.remove('was-validated')
    }
    bootstrapForm.classList.add('was-validated')
})
const form = document.getElementById('contactForm')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const messageInput = document.getElementById('message')

const namePattern = /^[A-Za-z\s]+$/
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

nameInput.addEventListener('input', () => {
    nameInput.classList.toggle('is-invalid', !namePattern.test(nameInput.value) || nameInput.value.length < 3)
})

emailInput.addEventListener('input', () => {
    emailInput.classList.toggle('is-invalid', !emailPattern.test(emailInput.value))
})

messageInput.addEventListener('input', () => {
    const length = messageInput.value.length
    messageInput.classList.toggle('is-invalid', length < 10 || length > 500)
})

form.addEventListener('submit', function (event) {
    event.preventDefault()
    let valid = true

    if (!namePattern.test(nameInput.value) || nameInput.value.length < 3) {
        nameInput.classList.add('is-invalid')
        valid = false
    }

    if (!emailPattern.test(emailInput.value)) {
        emailInput.classList.add('is-invalid')
        valid = false
    }

    const msgLength = messageInput.value.length
    if (msgLength < 10 || msgLength > 500) {
        messageInput.classList.add('is-invalid')
        valid = false
    }

    if (valid) {
        form.reset()
        form.classList.remove('was-validated')
        const toastEl = document.getElementById('formToast')
        const toast = new bootstrap.Toast(toastEl)
        toast.show()
    } else {
        form.classList.add('was-validated')
    }
})