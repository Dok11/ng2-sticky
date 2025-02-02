import { Component, ElementRef, EventEmitter, HostListener, Input, NgModule, Output } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class StickyComponent {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.element = element;
        this.zIndex = 10;
        this.width = 'auto';
        this.offsetTop = 0;
        this.offsetBottom = 0;
        this.start = 0;
        this.stickClass = 'sticky';
        this.endStickClass = 'sticky-end';
        this.mediaQuery = '';
        this.parentMode = true;
        this.orientation = 'none';
        this.activated = new EventEmitter();
        this.deactivated = new EventEmitter();
        this.reset = new EventEmitter();
        this.isStuck = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.elem = this.element.nativeElement;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // define scroll container as parent element
        this.container = this.elem.parentNode;
        this.defineOriginalDimensions();
        this.sticker();
    }
    /**
     * @return {?}
     */
    onChange() {
        this.sticker();
    }
    /**
     * @return {?}
     */
    defineOriginalDimensions() {
        this.originalCss = {
            zIndex: this.getCssValue(this.elem, 'zIndex'),
            position: this.getCssValue(this.elem, 'position'),
            top: this.getCssValue(this.elem, 'top'),
            right: this.getCssValue(this.elem, 'right'),
            left: this.getCssValue(this.elem, 'left'),
            bottom: this.getCssValue(this.elem, 'bottom'),
            width: this.getCssValue(this.elem, 'width'),
        };
        if (this.width === 'auto') {
            this.width = this.originalCss.width;
        }
    }
    /**
     * @return {?}
     */
    defineDimensions() {
        let /** @type {?} */ containerTop = this.getBoundingClientRectValue(this.container, 'top');
        this.windowHeight = window.innerHeight;
        this.elemHeight = this.getCssNumber(this.elem, 'height');
        this.containerHeight = this.getCssNumber(this.container, 'height');
        this.containerStart = containerTop + this.scrollbarYPos() - this.offsetTop + this.start;
        if (this.parentMode) {
            this.scrollFinish = this.containerStart - this.start - this.offsetBottom + (this.containerHeight - this.elemHeight);
        }
        else {
            this.scrollFinish = document.body.offsetHeight;
        }
    }
    /**
     * @return {?}
     */
    resetElement() {
        this.elem.classList.remove(this.stickClass);
        Object.assign(this.elem.style, this.originalCss);
        this.reset.next(this.elem);
    }
    /**
     * @return {?}
     */
    stuckElement() {
        this.isStuck = true;
        this.elem.classList.remove(this.endStickClass);
        this.elem.classList.add(this.stickClass);
        Object.assign(this.elem.style, {
            zIndex: this.zIndex,
            position: 'fixed',
            top: this.offsetTop + 'px',
            right: 'auto',
            bottom: 'auto',
            left: this.getBoundingClientRectValue(this.elem.parentElement, 'left') + 'px',
            width: this.width
        });
        this.activated.next(this.elem);
    }
    /**
     * @return {?}
     */
    unstuckElement() {
        this.isStuck = false;
        this.elem.classList.add(this.endStickClass);
        this.container.style.position = 'relative';
        Object.assign(this.elem.style, {
            position: 'absolute',
            top: 'auto',
            left: 'auto',
            right: this.getCssValue(this.elem, 'float') === 'right' || this.orientation === 'right' ? 0 : 'auto',
            bottom: this.offsetBottom + 'px',
            width: this.width
        });
        this.deactivated.next(this.elem);
    }
    /**
     * @return {?}
     */
    matchMediaQuery() {
        if (!this.mediaQuery)
            return true;
        return (window.matchMedia('(' + this.mediaQuery + ')').matches ||
            window.matchMedia(this.mediaQuery).matches);
    }
    /**
     * @return {?}
     */
    sticker() {
        // check media query
        if (!this.matchMediaQuery()) {
            this.resetElement();
            return;
        }
        // detecting when a container's height changes
        let /** @type {?} */ currentContainerHeight = this.getCssNumber(this.container, 'height');
        if (currentContainerHeight !== this.containerHeight) {
            this.defineDimensions();
        }
        // check if the sticky element is above the container
        if (this.elemHeight >= currentContainerHeight) {
            return;
        }
        let /** @type {?} */ position = this.scrollbarYPos();
        // unstick
        if (this.isStuck && (position < this.containerStart || position > this.scrollFinish) || position > this.scrollFinish) {
            this.resetElement();
            if (position > this.scrollFinish)
                this.unstuckElement();
            this.isStuck = false;
        }
        else if (position > this.containerStart && position < this.scrollFinish) {
            this.stuckElement();
        }
    }
    /**
     * @return {?}
     */
    scrollbarYPos() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }
    /**
     * @param {?} element
     * @param {?} property
     * @return {?}
     */
    getBoundingClientRectValue(element, property) {
        let /** @type {?} */ result = 0;
        if (element && element.getBoundingClientRect) {
            let /** @type {?} */ rect = element.getBoundingClientRect();
            result = (typeof rect[property] !== 'undefined') ? rect[property] : 0;
        }
        return result;
    }
    /**
     * @param {?} element
     * @param {?} property
     * @return {?}
     */
    getCssValue(element, property) {
        let /** @type {?} */ result = '';
        if (typeof window.getComputedStyle !== 'undefined') {
            result = window.getComputedStyle(element, '').getPropertyValue(property);
        }
        else if (typeof element.currentStyle !== 'undefined') {
            result = element.currentStyle[property];
        }
        return result;
    }
    /**
     * @param {?} element
     * @param {?} property
     * @return {?}
     */
    getCssNumber(element, property) {
        if (typeof element === 'undefined')
            return 0;
        return parseInt(this.getCssValue(element, property), 10) || 0;
    }
}
StickyComponent.decorators = [
    { type: Component, args: [{
                selector: 'sticky,[sticky]',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
StickyComponent.ctorParameters = () => [
    { type: ElementRef, },
];
StickyComponent.propDecorators = {
    "sticky": [{ type: Input, args: ['sticky',] },],
    "zIndex": [{ type: Input, args: ['sticky-zIndex',] },],
    "width": [{ type: Input, args: ['sticky-width',] },],
    "offsetTop": [{ type: Input, args: ['sticky-offset-top',] },],
    "offsetBottom": [{ type: Input, args: ['sticky-offset-bottom',] },],
    "start": [{ type: Input, args: ['sticky-start',] },],
    "stickClass": [{ type: Input, args: ['sticky-class',] },],
    "endStickClass": [{ type: Input, args: ['sticky-end-class',] },],
    "mediaQuery": [{ type: Input, args: ['sticky-media-query',] },],
    "parentMode": [{ type: Input, args: ['sticky-parent',] },],
    "orientation": [{ type: Input, args: ['sticky-orientation',] },],
    "activated": [{ type: Output },],
    "deactivated": [{ type: Output },],
    "reset": [{ type: Output },],
    "onChange": [{ type: HostListener, args: ['window:scroll', ['$event'],] }, { type: HostListener, args: ['window:resize', ['$event'],] }, { type: HostListener, args: ['window:orientationchange', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class StickyModule {
}
StickyModule.decorators = [
    { type: NgModule, args: [{
                declarations: [StickyComponent],
                exports: [StickyComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { StickyComponent, StickyModule };
//# sourceMappingURL=ngx-sticky-kit.js.map
