var font_size
var pic_mode
var flag_remove_br = false;

function remove_br_if_not() {
    if (!flag_remove_br) {
        s1_remove_br_in_replies(4)
        flag_remove_br = true;
    }
}

// Decorate the user's html using user's configuration
async function decorate_html (force_fetch = false) {
    if (force_fetch) {
        row_size = await get_set_storage(S1_KEY_ROW_SIZE, USER_DEFAULT_ROW_SIZE)
        font_size = await get_set_storage(S1_KEY_FONT_SIZE, USER_DEFAULT_FONT_SIZE)
        pic_mode = await get_set_storage(S1_KEY_PIC_MODE, USER_DEFAULT_PIC_MODE)
    }

    s1_user_set_row_size(row_size)
    s1_user_set_font_size(font_size)
    
    remove_br_if_not()

    s1_user_set_pic_width(pic_mode)
}


const debounce = (func, wait) => {
    let timeoutId = null;

    return (...args) => {
        clearTimeout(timeoutId)

        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, wait)
    }
}

// Once content script is loaded, trigger.
decorate_html(true)

const debouncedDecorateLazy = debounce(() => {
    decorate_html(false)
}, 250)

// Fix: Lazy-load images, they load when user scrolls.
// So we fix it by when user is scrolling, we trigger the resize of images.
addEventListener("scroll", debouncedDecorateLazy)

const MY_BROWSER = s1_get_browser()
MY_BROWSER.runtime.onMessage.addListener((message) => {
    if (message && message[KEY_DECORATE]) {
        decorate_html(true)
    }
});