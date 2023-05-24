var font_size
var pic_mode

// Decorate the user's html using user's configuration
async function decorate_html (force_fetch = false) {
    if (force_fetch) {
        font_size = await get_set_storage(S1_KEY_FONT_SIZE, USER_DEFAULT_FONT_SIZE)
        pic_mode = await get_set_storage(S1_KEY_PIC_MODE, USER_DEFAULT_PIC_MODE)
    }

    s1_user_set_font_size(font_size)
    s1_user_set_pic_width(pic_mode)

    // Special:
    if (S1_PIC_WIDTHS[pic_mode] <= S1_PIC_WIDTHS.smaller) {
        s1_remove_br_in_replies(0)
    }
}


// Once content script is loaded, trigger.
decorate_html(true)

// Fix: Lazy-load images, they load when user scrolls.
// So we fix it by when user is scrolling, we trigger the resize of images.
addEventListener("scroll", (event) => {
    decorate_html(false)
})

const MY_BROWSER = s1_get_browser()
MY_BROWSER.runtime.onMessage.addListener((message) => {
    if (message && message[KEY_DECORATE]) {
        decorate_html(true)
    }
});