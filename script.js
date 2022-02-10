const main = document.getElementById('main')
const sections = document.querySelectorAll('.slider-item')
const slider = document.getElementById('slider')
let sliderWidth
let imageWidth
let sectionWidth
let current = 0
let target = 0
let ease = 0.07


function lerp(start, end, t) {
    return start * (1-t) + end * t
} 

function setTransform(element, transform) {
    element.style.transform = transform
}

function init() {
    sliderWidth = slider.getBoundingClientRect().width
    sectionWidth = sliderWidth / sections.length
    document.body.style.height = `${sliderWidth - (window.innerWidth - window.innerHeight)}px`
}

function animate() {
    current = parseFloat(lerp(current, target, ease)).toFixed(2)
    target = window.scrollY
    setTransform(slider, `translateX(-${current}px)`)
    // animateImages()
    requestAnimationFrame(animate)
}

function animateImages() {
    let ratio = current / imageWidth
    let intersectionRatioValue

    images.forEach((image, idx) => {
        intersectionRatioValue = ratio - (idx * 0.7)
        setTransform(image, `translateX(${intersectionRatioValue * 70}px)`)
    })
}

init()
// animate()
