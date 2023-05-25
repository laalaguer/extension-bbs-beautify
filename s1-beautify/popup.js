/** Helper: communicate with content script */

async function tell_page_to_redecorate() {
    const MY_BROWSER = s1_get_browser()
    const tabs = await MY_BROWSER.tabs.query({active: true, currentWindow: true})
    
    const message = {}
    message[KEY_DECORATE] = true
    
    if (tabs && tabs.length > 0) {
        MY_BROWSER.tabs.sendMessage(tabs[0].id, message)
    }
}



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
        s1_set(S1_KEY_FONT_SIZE, dropdown_reply.value).then(() => {
            tell_page_to_redecorate()
        })
    });

    // Set default value if isn't set before
    const dropdown_row = document.getElementById('dropdown_row');
    s1_get(S1_KEY_ROW_SIZE).then((value) => {
        if (value) {
            dropdown_row.value = value
        } else {
            s1_set(S1_KEY_ROW_SIZE, USER_DEFAULT_ROW_SIZE).then(() => {
                dropdown_row.value = USER_DEFAULT_ROW_SIZE
            })
        }
    })

    // Listen to the configuration changes
    dropdown_row.addEventListener('change', () => {
        s1_set(S1_KEY_ROW_SIZE, dropdown_row.value).then(() => {
            tell_page_to_redecorate()
        })
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
        s1_set(S1_KEY_PIC_MODE, dropdown_pic.value).then(() => {
            tell_page_to_redecorate()
        })
    })
})