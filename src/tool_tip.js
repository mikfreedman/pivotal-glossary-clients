import Tippy from 'tippy.js';


export class ToolTip {
    constructor(html) {
        const selectedTextReference = {
            getBoundingClientRect() {
                var s = window.getSelection();
                var oRange = s.getRangeAt(0);
                return oRange.getBoundingClientRect();
            },
            clientHeight: 100,
            clientWidth: 100
        };

        return Tippy.one(selectedTextReference, {
            trigger: 'manual',
            arrow: true,
            maxWidth: '400px',
            interactive: true,
            html: html
        });
    }
}