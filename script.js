const pageLinks = document.querySelectorAll('.link-item')

const scheduleItems = document.querySelectorAll('.schedule-item')
const infoDivs = document.querySelectorAll('.schedule-info')
const iframes = document.querySelectorAll('.iframe')

const toast = document.querySelector('.toast-container')
const toastClose = document.getElementById('toast-close')

const section = document.getElementById('section-home')
const sections = document.querySelectorAll('.pageSection')
const topbar = document.getElementById('topbar')

const playerPlaceholder = document.getElementById('player-placeholder')

let current_index = 0

pageLinks.forEach((link, idx) => {
   
    link.addEventListener('click', () => {
        current_index = idx
        link.classList.add('link-active')
    })

    
})

function setActiveLink(linkElement) {
    pageLinks.forEach((link, idx) => {
        if(idx !== current_index) {
            link.classList.remove('link-active')

        }
    })
    linkElement.classList.add('link-active')
}

scheduleItems.forEach((item, idx) => {
    iframes.forEach(iframe => {
        iframe.style.display = 'none'
    })



    item.addEventListener('mouseenter', () => {
        iframes[idx].style.display = 'block'
        infoDivs[idx].classList.add('schedule-info-active')
        scheduleItems[idx].classList.add('schedule-item-active')
    })
    

    item.addEventListener('mouseleave', () => {
        iframes[idx].style.display = 'none'
        infoDivs[idx].classList.remove('schedule-info-active')
        scheduleItems[idx].classList.remove('schedule-item-active')

    })
})

sections.forEach(section => {
    console.log(section.offsetTop, section.offsetTop + section.offsetHeight)
})

window.addEventListener('scroll', () => {
    let middle = scrollY + window.innerHeight / 2

    console.log(middle)

    sections.forEach((section, idx) => {
        if(middle > section.offsetTop && middle < section.offsetTop + (section.offsetHeight - 200)) {
            current_index = idx
            setActiveLink(pageLinks[idx])
        }
    })

    if (scrollY > (section.getBoundingClientRect().height - 40)) {
        topbar.classList.add('topbar-small')
    } else {
        topbar.classList.remove('topbar-small')
    }
})

playerPlaceholder.addEventListener('click', () => {
    const canvas = document.createElement('canvas')
    canvas.id = "unity-canvas"
    canvas.width = 960
    canvas.height = 600
    canvas.style.width = 960
    canvas.style.height = 600
    canvas.style.background = "url('Build/Build2.jpg') center / cover" 

    section.appendChild(canvas)
    section.removeChild(playerPlaceholder)

    createUnityInstance(document.querySelector("#unity-canvas"), {
        dataUrl: "Build/Build.data",
        frameworkUrl: "Build/Build.framework.js",
        codeUrl: "Build/Build.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "stonefromnothing",
        productName: "jazz-band",
        productVersion: "0.1",
        // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
        // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
      });

    document.addEventListener('wheel', onScroll, false)
    document.addEventListener('mousemove', onMouse, false)
    var content = document.getElementById('unity-canvas')
    function onMouse() { content.style['pointer-events'] = 'auto'; }
    function onScroll() { content.style['pointer-events'] = 'none'; }

    setTimeout(() => {
        toast.classList.add('active')
    }, 4000)
    
    toastClose.addEventListener('click', () => {
        toast.classList.remove('active')
    })

    
})

iframes[0].style.display = 'block'




// const main = document.getElementById('main')
// const sections = document.querySelectorAll('.slider-item')
// const slider = document.getElementById('slider')
// let sliderWidth
// let imageWidth
// let sectionWidth
// let current = 0
// let target = 0
// let ease = 0.07


// function lerp(start, end, t) {
//     return start * (1-t) + end * t
// } 

// function setTransform(element, transform) {
//     element.style.transform = transform
// }

// function init() {
//     sliderWidth = slider.getBoundingClientRect().width
//     sectionWidth = sliderWidth / sections.length
//     document.body.style.height = `${sliderWidth - (window.innerWidth - window.innerHeight)}px`
// }

// function animate() {
//     current = parseFloat(lerp(current, target, ease)).toFixed(2)
//     target = window.scrollY
//     setTransform(slider, `translateX(-${current}px)`)
//     // animateImages()
//     requestAnimationFrame(animate)
// }

// function animateImages() {
//     let ratio = current / imageWidth
//     let intersectionRatioValue

//     images.forEach((image, idx) => {
//         intersectionRatioValue = ratio - (idx * 0.7)
//         setTransform(image, `translateX(${intersectionRatioValue * 70}px)`)
//     })
// }

// init()
// animate()
