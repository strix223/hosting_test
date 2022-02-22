// VARS FOR NAV BAR LINK FUNCTIONALITY
const pageLinks = document.querySelectorAll('.link-item')

// VARS FOR LOADING THE PLAYER
const playerPlaceholder = document.getElementById('player-placeholder')

// VARS FOR PLAYER INSTRUCTION FUNCTIONALITY
const toast = document.getElementById('toast-container')
const toastClose = document.getElementById('toast-close')

// VARS FOR SCROLLING AND WINDOW NAVIGATION
const section = document.getElementById('section-home')
const sections = document.querySelectorAll('.page-section')
const topbar = document.getElementById('topbar')

// VARS FOR GALLERY MODAL FUNTIONALITY
const modal = document.getElementById('img-modal')
const images = document.querySelectorAll('.img-div')
const modalClose = document.getElementById('modal-close')

// VARS FOR SCHEDULE SECTION FUNCTIONALITY
const scheduleItems = document.querySelectorAll('.schedule-item')
const infoDivs = document.querySelectorAll('.schedule-info')
const iframes = document.querySelectorAll('.iframe')

// VARS FOR TROUBLESHOOTING
//const test = document.getElementById('test') 

//test.innerHTML = `${window.innerWidth} x ${window.innerHeight}`


let current_index = 0

// ADD EVENT LISTENERS FOR EACH NAVBAR LINK
pageLinks.forEach((link, idx) => {
   
    link.addEventListener('click', () => {
        current_index = idx
        link.classList.add('link-active')
    })

    
})

// ADD FUNCTIONALITY FOR DISPLAYING THE IMAGE MODAL WHEN AN IMAGE IS CLICKED
images.forEach(image => {
    image.addEventListener('click', (e) => {
        modal.classList.add('modal-active')
        const modalImg = modal.querySelector('img.modal-img')
        const clickedImg = image.querySelector('img.img')
        modalImg.src = clickedImg.src
    })
})

// CLOSE THE MODAL WHEN BUTTON CLICKED
modalClose.addEventListener('click', () => {
    modal.classList.remove('modal-active')
})

// EVENT LISTENERS AND FUCNCTIONALITY FOR SCHEDULING PAGE
scheduleItems.forEach((item, idx) => {

    //DEACTIVATE ALL IFRAMES
    iframes.forEach(iframe => {
        iframe.classList.remove('iframe-active')

    })



    // IF MOUSE OVER SCHEDULE ITEM, REMOVE ACTIVE CLASS FROM OTHERS AND ADD ACTIVE TO CURRENT
    item.addEventListener('mouseenter', () => {
        scheduleItems.forEach(i => {
            i.classList.remove('schedule-item-active')
        })

        iframes.forEach(i => {
            i.classList.remove('iframe-active')
        })

        infoDivs.forEach(i => {
            i.classList.remove('schedule-info-active')
        })

        iframes[idx].classList.add('iframe-active')
        infoDivs[idx].classList.add('schedule-info-active')
        scheduleItems[idx].classList.add('schedule-item-active')
    })
    
})

// UPDATE THE NAVBAR LINK DECORATION DEPENDING ON SCOLL LOCATION ON THE PAGE
window.addEventListener('scroll', () => {
    
    // IF SCROLL POSITION IS WITHIN SECTION, SET THE CORRESTPONDING NAVBAR LINK
    let middle = scrollY + window.innerHeight / 2

    sections.forEach((section, idx) => {
        if(middle > section.offsetTop && middle < section.offsetTop + (section.offsetHeight - 200)) {
            current_index = idx
            setActiveLink(pageLinks[idx])
        }
    })

    // IF SCROLL POSITION IS BEYOND THE FIRST PAGE, SHRINK THE NAVBAR
    if (scrollY > (section.getBoundingClientRect().height - 40)) {
        topbar.classList.add('topbar-small')
    } else {
        topbar.classList.remove('topbar-small')
    }
})

// IF HERO PLACEHOLDER IS CLICKED, LOAD THE UNITY WEBPLAYER AND APPEND TO DOCUMENT
playerPlaceholder.addEventListener('click', () => {

    // CREATE CANVAS ELEMENT WITH ATTRIBUTES
    const canvas = document.createElement('canvas')
    canvas.id = "unity-canvas"
    canvas.width = 960
    canvas.height = 600
    canvas.style.width = 960
    canvas.style.height = 600
    canvas.style.background = "url('Build3/original-music-build.jpg') center / cover" 

    // APPEND CANVAS AND REMOVE PLACEHOLDER
    section.appendChild(canvas)
    section.removeChild(playerPlaceholder)

    // LOAD THE WEBPLAYER 
    createUnityInstance(document.querySelector("#unity-canvas"), {
        dataUrl: "Build3/original-music-build.data",
        frameworkUrl: "Build3/original-music-build.framework.js",
        codeUrl: "Build3/original-music-build.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "stonefromnothing",
        productName: "jazz-band",
        productVersion: "0.1",
      });

    // PREVENT THE WEBPLAYER FROM CAPTURING MOUSE SCROLL
    document.addEventListener('wheel', onScroll, false)
    document.addEventListener('mousemove', onMouse, false)
    var content = document.getElementById('unity-canvas')
    function onMouse() { content.style['pointer-events'] = 'auto'; }
    function onScroll() { content.style['pointer-events'] = 'none'; }

    // AFTER 4 SECONDS DISPLAY TOAST WITH INSTRUCTIONS
    setTimeout(() => {
        toast.classList.add('toast-active')
    }, 4000)
    
    toastClose.addEventListener('click', () => {
        toast.classList.remove('toast-active')
    })

    
})

// FUNCTION FOR SETTING THE CURRENT NAVBAR LINK
function setActiveLink(linkElement) {
    pageLinks.forEach((link, idx) => {
        if(idx !== current_index) {
            link.classList.remove('link-active')

        }
    })
    linkElement.classList.add('link-active')
}

// SET DEFAULT SCHEDULE ITEM
iframes[0].classList.add('iframe-active')

