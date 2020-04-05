"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var ITEM_HEIGHT = 44;
component_1.VantComponent({
    classes: [
        'main-item-class',
        'content-item-class',
        'main-active-class',
        'content-active-class',
        'main-disabled-class',
        'content-disabled-class'
    ],
    props: {
        items: Array,
        activeId: null,
        mainActiveIndex: {
            type: Number,
            value: 0
        },
        maxHeight: {
            type: Number,
            value: 300
        },
        max: {
            type: Number,
            value: Infinity
        }
    },
    data: {
        subItems: [],
        mainHeight: 0,
        itemHeight: 0
    },
    watch: {
        items: function () {
            var _this = this;
            this.updateSubItems().then(function () {
                _this.updateMainHeight();
            });
        },
        maxHeight: function () {
            this.updateItemHeight(this.data.subItems);
            this.updateMainHeight();
        },
        mainActiveIndex: 'updateSubItems'
    },
    methods: {
        // 当一个子项被选择时
        onSelectItem: function (event) {
            var item = event.currentTarget.dataset.item;
            var isArray = Array.isArray(this.data.activeId);
            // 判断有没有超出右侧选择的最大数
            var isOverMax = isArray && (this.data.activeId.length >= this.data.max);
            // 判断该项有没有被选中, 如果有被选中，则忽视是否超出的条件
            var isSelected = isArray ? this.data.activeId.indexOf(item.id) > -1 : this.data.activeId === item.id;
            if (!item.disabled && (!isOverMax || isSelected)) {
                this.$emit('click-item', item);
            }
        },
        // 当一个导航被点击时
        onClickNav: function (event) {
            var index = event.currentTarget.dataset.index;
            var item = this.data.items[index];
            if (!item.disabled) {
                this.$emit('click-nav', { index: index });
            }
        },
        // 更新子项列表
        updateSubItems: function () {
            var _a = this.data, items = _a.items, mainActiveIndex = _a.mainActiveIndex;
            var _b = (items[mainActiveIndex] || {}).children, children = _b === void 0 ? [] : _b;
            this.updateItemHeight(children);
            return this.set({ subItems: children });
        },
        // 更新组件整体高度，根据最大高度和当前组件需要展示的高度来决定
        updateMainHeight: function () {
            var _a = this.data, _b = _a.items, items = _b === void 0 ? [] : _b, _c = _a.subItems, subItems = _c === void 0 ? [] : _c;
            var maxHeight = Math.max(items.length * ITEM_HEIGHT, subItems.length * ITEM_HEIGHT);
            this.setData({ mainHeight: Math.min(maxHeight, this.data.maxHeight) });
        },
        // 更新子项列表高度，根据可展示的最大高度和当前子项列表的高度决定
        updateItemHeight: function (subItems) {
            var itemHeight = Math.min(subItems.length * ITEM_HEIGHT, this.data.maxHeight);
            return this.setData({ itemHeight: itemHeight });
        }
    }
});
