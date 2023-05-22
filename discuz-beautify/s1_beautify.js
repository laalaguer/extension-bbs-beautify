// Enlarge the list of topics
function enlarge_rows() {
    const prefix_size = '16px'
    const title_size = '20px'

    const prefixes = document.querySelectorAll("tbody > tr > th > em > a")
    prefixes.forEach( (item) => {
        // Originally 14px
        item.style["font-size"] = prefix_size
    })

    const titles = document.querySelectorAll("tbody > tr > th > a")
    titles.forEach( (item) => {
        // Originally 14px
        item.style["font-size"] = title_size
    })
}

// Enlarge each reply to the topic
function enlarge_replies() {
    const content_size = '22px'
    const replies = document.querySelectorAll("td.t_f")
    replies.forEach((item) => {
        item.style["font-size"] = content_size
    })
}

// Enlarge each reply's author's name.
function enlarge_author() {
    const size = '16px'
    const m = document.querySelectorAll("a.xw1")
    m.forEach((item) => {
        item.style["font-size"] = size
        // item.style["padding"] = '15px 0'
    })
}

// Normalize each picture to fit to the window of scrolling.
function getWindowSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}


function normalizePics() {
    const r = document.querySelectorAll("img.zoom")
    r.forEach((item) => {
        item.style['border-radius'] = '8px'
        item.style['max-width'] = '70%'
        item.style['margin'] = '5px 0'
        item.style['height'] = 'auto'
    })
}


enlarge_rows()
enlarge_replies()
enlarge_author()
normalizePics()

// When scroll, try to normalize lazy-loading images
addEventListener("scroll", (event) => {
    normalizePics()
})
