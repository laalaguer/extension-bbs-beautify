/**
 * This file contains common sizes, operations.
 */

/** This section relates to size constants and page actions */

const S1_FONT_SIZES = {
    'smaller':  12,
    'small':    14,
    'normal':   16,
    'big':      18,
    'bigger':   24,
    'ultra':    32
}

const S1_PIC_WIDTHS = {
    'compact':  10,
    'smaller':  30,
    'small':    70,
    'normal':   100
}

/**
 * Select a group of elements, change their specific css attribute with specific value.
 * @param {string} elementSelector 
 * @param {string} attributeSelector 
 * @param {string|number} attributeValue 
 */
function s1_style_elements(elementSelector, attributeSelector, attributeValue) {
    const elements = document.querySelectorAll(elementSelector)
    elements.forEach( (item) => {
        item.style[attributeSelector] =  attributeValue
    })
}

/**
 * Style the rows of discussion table.
 * @param {number} prefix_size 
 * @param {number} title_size 
 */
function s1_resize_rows(prefix_size = S1_FONT_SIZES.small, title_size = S1_FONT_SIZES.normal) {
    s1_style_elements("tbody > tr > th > em > a", 'font-size', `${prefix_size}px`)
    s1_style_elements("tbody > tr > th > a", 'font-size', `${title_size}px`)
}

/**
 * Style each reply of a thread.
 * @param {number} content_size 
 */
function s1_resize_replies(content_size = S1_FONT_SIZES.big) {
    s1_style_elements("td.t_f", 'font-size', `${content_size}px`)
}

/**
 * Style each reply's author name
 * @param {number} content_size 
 */
function s1_resize_reply_author(content_size = S1_FONT_SIZES.normal) {
    s1_style_elements("a.xw1", 'font-size', `${content_size}px`)
}

/**
 * Get current window size
 * @returns width, height in px
 */
function s1_get_window_size() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}

/**
 * Decorate an HTML element, if not decorated before.
 * @param {HTMLElement} item 
 */
function s1_decorate_pic(item) {
    if (!item.getAttribute('s1-decorated')) {
        item.style['border-radius'] = '8px'
        item.style['margin'] = '5px 5px'
        item.style['box-shadow'] = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)'
        item.setAttribute('s1-decorated', 'true')
    }
}

/**
 * Normalize pictures to fit the outside container,
 * @param {number} max_width 10 is 10%, 80 is 80%
 */
function s1_set_pic_width(max_width = S1_PIC_WIDTHS.normal) {
    const r = document.querySelectorAll("img.zoom")
    r.forEach((item) => {
        s1_decorate_pic(item)
        if (!item.style['max-width'] || item.style['max-width'] !== `${max_width}%`) {
            item.style['height'] = 'auto'
            item.style['max-width'] = `${max_width}%`
        }
    })
}

/**
 * Remove <br> tag between <img> tags
 * @param {string} elementSelector
 * @param {number} max_tolerance max tolerance of br counts 
 */
function s1_remove_br_between_pics (elementSelector, max_tolerance = 2) {
    const elements = document.querySelectorAll(elementSelector)
    elements.forEach((item) => {
        const kids = item.children
        const throwAways = []
        for (let i = 0; i < kids.length ; i++) {
            let previous = i - 1;
            let next = i + 1;
            if (previous >= 0 && next < kids.length) {
                if (kids[i].tagName == 'BR' && kids[previous].tagName == 'IMG' && kids[next].tagName == 'IMG') {
                    throwAways.push(kids[i])
                }
            }
        }

        if (throwAways.length > max_tolerance) {
            throwAways.forEach((toBeThrow) => {
                item.removeChild(toBeThrow)
            })
        }
    })
}

/**
 * Do s1_remove_br_between_pics on the replies (posts) on HTML
 */
function s1_remove_br_in_replies(max_tolerance = 5) {
    s1_remove_br_between_pics("td.t_f", max_tolerance)
}

/** External called by user */
function s1_user_set_font_size(user_option) {
    var value = S1_FONT_SIZES[user_option]
    if (value) {
        s1_resize_replies(value)
    }
}

/** External called by user */
function s1_user_set_row_size(user_option) {
    var value = S1_FONT_SIZES[user_option]
    if (value) {
        s1_resize_rows(value, value)
    }
}

/** External called by user */
function s1_user_set_pic_width(user_option) {
    var value = S1_PIC_WIDTHS[user_option]
    if (value) {
        s1_set_pic_width(value)
    }
}


/** 
 * Local Storage Keys and Values
*/

function s1_get_browser() {
    const S1_BROWSER = window.browser && browser.runtime ? browser : chrome
    return S1_BROWSER
}

const S1_BROWSER = s1_get_browser()
const S1_KEY_ROW_SIZE = 'S1_KEY_ROW_SIZE'
const S1_KEY_FONT_SIZE = 'S1_KEY_FONT_SIZE'
const S1_KEY_PIC_MODE = 'S1_KEY_PIC_MODE'

/**
 * Local Storage Operations
 */

// Get
async function s1_get(key) {
    try {
        const items = await S1_BROWSER.storage.sync.get(key)
        console.log('get', key, items)
        if (items) {
            return items[key]
        } else {
            return undefined
        }
    } catch (error) {
        console.log(error)
        return undefined
    }
}

// Set
async function s1_set(key, value) {
    var items = {}
    items[key] = value;
    try {
        const result = await S1_BROWSER.storage.sync.set(items)
        console.log('set result', result)
        console.log('set', key, items)

        const a = await s1_get(key)
        console.log('inspect', key, a)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

// Helper: get-set user's configuration
// if empty, then set the user's settings with default value.
async function get_set_storage (key, value) {
    const _value = await s1_get(key)
    if (!_value) {
        await s1_set(key, value)
        return value
    } else {
        return _value
    }
}

/** 
 * User defaults on first install
 */

const USER_DEFAULT_ROW_SIZE = "big"
const USER_DEFAULT_FONT_SIZE = "big"
const USER_DEFAULT_PIC_MODE = "normal"


/**
 * Message communication keys and values
 */

const KEY_DECORATE = 'decorate'