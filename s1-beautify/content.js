s1_resize_rows(S1_FONT_SIZES.normal, S1_FONT_SIZES.big)
s1_resize_replies(S1_FONT_SIZES.big)
s1_resize_reply_author()
s1_remove_br_in_replies()
s1_set_pic_width(S1_PIC_WIDTHS.compact)

// When scroll, try to normalize lazy-loading images
addEventListener("scroll", (event) => {
    s1_remove_br_in_replies()
    s1_set_pic_width(S1_PIC_WIDTHS.compact)
})
