/** Trigger once the popup.html is loaded  */
document.addEventListener('DOMContentLoaded', () => {

    // Set default value if isn't set before
    const dropdown_reply = document.getElementById('dropdown_reply');
    s1_get(S1_KEY_FONT_SIZE).then((value) => {
        if (value) {
            dropdown_reply.value = value
        } else {
            s1_set(S1_KEY_FONT_SIZE, USER_DEFAULT_FONT_SIZE).then(() => {
                dropdown_reply.value = USER_DEFAULT_FONT_SIZE
            })
        }
    })

    // Listen to the configuration changes
    dropdown_reply.addEventListener('change', () => {
        s1_set(S1_KEY_FONT_SIZE, dropdown_reply.value)
    });

    // Set default value if isn't set before
    const dropdown_pic = document.getElementById('dropdown_pic');
    s1_get(S1_KEY_PIC_MODE).then((value) => {
        if (value) {
            dropdown_pic.value = value
        } else {
            s1_set(S1_KEY_PIC_MODE, USER_DEFAULT_PIC_MODE).then(() => {
                dropdown_pic.value = USER_DEFAULT_PIC_MODE
            })
        }
    })

    // Listen to the configuration changes
    dropdown_pic.addEventListener('change', () => {
        s1_set(S1_KEY_PIC_MODE, dropdown_pic.value)
    });
})