const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
const md = require("markdown-it")({
    html: true,
    linkify: true,
    typography: true,
    breaks: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return (
                    '<pre class="hljs">' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    "</pre>"
                );
            } catch (__) {}
        }

        return '<pre"hljs">' + md.utils.escapeHtml(str) + "</pre>";
    },
})
    .use(require("markdown-it-imsize"))
    .use(require("markdown-it-sub"))
    .use(require("markdown-it-sup"))
    .use(require("markdown-it-abbr"))
    .use(function markdownItUnderline(md) {
        function renderEm(tokens, idx, opts, _, slf) {
            var token = tokens[idx];
            if (token.markup === "_") {
                token.tag = "u";
            }
            return slf.renderToken(tokens, idx, opts);
        }

        md.renderer.rules.em_open = renderEm;
        md.renderer.rules.em_close = renderEm;
    });

export function markdownParser(str) {
    return md.render(str).replaceAll("|{|", "<code>").replaceAll("|}|", "</code>");
}
