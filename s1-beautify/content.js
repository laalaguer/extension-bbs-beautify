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

// Decorate the user's html using user's configuration
async function decorate_html () {
    const font_size = await get_set_storage(S1_KEY_FONT_SIZE, USER_DEFAULT_FONT_SIZE)
    const pic_mode = await get_set_storage(S1_KEY_PIC_MODE, USER_DEFAULT_PIC_MODE)

    s1_user_set_font_size(font_size)
    s1_user_set_pic_width(pic_mode)

    // Special:
    if (S1_PIC_WIDTHS[pic_mode] <= S1_PIC_WIDTHS.smaller) {
        s1_remove_br_in_replies(0)
    }
}


// Once content script is loaded, trigger.
decorate_html()

// Fix: Lazy-load images, they load when user scrolls.
// So we fix it by when user is scrolling, we trigger the resize of images.
addEventListener("scroll", (event) => {
    decorate_html()
})

const MY_BROWSER = s1_get_browser()
MY_BROWSER.runtime.onMessage.addListener((message) => {
    if (message && message[KEY_DECORATE])
    decorate_html()
});