/** Trigger once the popup.html is loaded  */
document.addEventListener('DOMContentLoaded', () => {

    // Set default value if isn't set before
    const dropdown_reply = document.getElementById('dropdown_reply');
    s1_get_font_size().then((value) => {
        if (value) {
            dropdown_reply.value = value
        } else {
            s1_set_font_size(USER_DEFAULT_FONT_SIZE).then(() => {
                dropdown_reply.value = USER_DEFAULT_FONT_SIZE
            })
        }
    })

    // Listen to the configuration changes
    dropdown_reply.addEventListener('change', () => {
        s1_set_font_size(dropdown_reply.value)
        // user_set_font_size(dropdown_reply.value)
    });

    // Set default value if isn't set before
    const dropdown_pic = document.getElementById('dropdown_pic');
    s1_get_pic_mode().then((value) => {
        if (value) {
            dropdown_pic.value = value
        } else {
            s1_set_pic_mode(USER_DEFAULT_PIC_MODE).then(() => {
                dropdown_pic.value = USER_DEFAULT_PIC_MODE
            })
        }
    })

    // Listen to the configuration changes
    dropdown_pic.addEventListener('change', () => {
        s1_set_pic_mode(dropdown_pic.value)
        // user_set_pic_width(dropdown_pic.value)
    });
})