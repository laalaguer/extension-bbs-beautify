s1_style_rows(S1_FONT_SIZES.normal, S1_FONT_SIZES.big)
s1_style_replies(S1_FONT_SIZES.big)
s1_style_reply_author()
autoCompactPicsOfReplies()
s1_set_pic_width(S1_PIC_WIDTHS.compact)

// When scroll, try to normalize lazy-loading images
addEventListener("scroll", (event) => {
    autoCompactPicsOfReplies()
    s1_set_pic_width(S1_PIC_WIDTHS.compact)
})
