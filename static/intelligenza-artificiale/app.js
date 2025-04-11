const title_container = document.getElementById("title-container")
const titles = ["AI - Intelligenza artificiale", "ML - Machine learning", "DL - Deep learning", "CV - Computer vision", "NLP - Natural language processing"]

function removeLetters(callback) {
    title_container.innerHTML = title_container.innerText.slice(0, -1)

    if (title_container.innerText.length > 0)
        setTimeout(() => removeLetters(callback), 50)
    else
        callback()
}

function showLetters(title_index = 0, letter_index = 0) {
    title_container.innerHTML += titles[title_index][letter_index]

    if (letter_index < titles[title_index].length - 1)
        setTimeout(() => showLetters(title_index, letter_index + 1), 50)
    else
        setTimeout(() =>
            removeLetters(() =>
                showLetters((title_index + 1) % titles.length)
            )
        , 2000)
}

showLetters()






particlesJS("particles-js", {
    particles: {
        number: { value: 80 },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },
        move: { enable: true, speed: 2 },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "bubble" },
            onclick: { enable: false },
        },
        modes: {
            bubble: {
                distance: 150, // Distanza in cui l'effetto "bubble" è visibile
                size: 5,      // Dimensione delle particelle durante l'effetto
                duration: 2,   // Durata dell'effetto in secondi
                opacity: 0.8,  // Opacità delle particelle durante l'effetto
                speed: 3,      // Velocità dell'effetto
            }
        },
    },
    retina_detect: true,
})


const slider_element = document.getElementById("slider")
const image_count = 4
let current_image_index = 0

function move_slider(image_index) {
    if (image_index < 0 || image_index >= image_count)
        return console.error("image_index not accepted")

    slider_element.style.translate = `-${image_index*100}% 0`
}

function next_image() {
    if (current_image_index == image_count-1)
        current_image_index = 0
    else
        current_image_index++

    move_slider(current_image_index)
}

setInterval(next_image, 5000)

document.getElementById("click-slider").addEventListener("click", next_image)
