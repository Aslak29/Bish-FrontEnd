import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify'

const initialState = {
    items: [],
    totalBeforeDiscount: 0,
    total: 0,
    discount: {},
    deliveryAddress: {},
    billingAddress: {},
    idPaymentIntent: null,
    timestampPaymentIntent: null,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { id, name, quantity, size, price } = action.payload
            if(!state.items.find(item => item.id === id && item.size === size)) {
                state.items.push({
                    id: id,
                    name: name,
                    quantity: quantity,
                    quantityDecrement: 0,
                    size: size,
                    lastKnownPrice: price
                })
            } else {
                state.items = state.items.map(item => {
                    if(item.id === id && item.size === size) {
                        item.quantity += quantity;
                    }
                    return item;
                });
            }
            state.total = 0
            state.discount = {}
            state.totalBeforeDiscount = state.items.reduce((acc, item) => acc + item.lastKnownPrice * item.quantity, 0)
            state.total = state.totalBeforeDiscount
            toast.success(name + ' ajouté au panier !', { position: "bottom-left", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
        },
        removeItem: (state, action) => {
            const { id, size } = action.payload
            state.items = state.items.filter(item => !(item.id === id && item.size === size));
            state.discount = {}
            state.totalBeforeDiscount = state.items.reduce((acc, item) => acc + item.lastKnownPrice * item.quantity, 0)
            state.total = state.totalBeforeDiscount
        },
        updateItemQuantity: (state, action) => {
            const { id, size, quantity } = action.payload
            state.items = state.items.map(item => {
                if(item.id === id && item.size === size) {
                    item.quantity = quantity;
                }
                return item;
            });
            state.discount = {}
            state.totalBeforeDiscount = state.items.reduce((acc, item) => acc + item.lastKnownPrice * item.quantity, 0)
            state.total = state.totalBeforeDiscount
        },
        updateItemPrice: (state, action) => {
            const { id, size, price } = action.payload
            state.items = state.items.map(item => {
                if(item.id === id && item.size === size) {
                    item.lastKnownPrice = price;
                }
                return item
            })
            state.discount = {}
            state.totalBeforeDiscount = state.items.reduce((acc, item) => acc + item.lastKnownPrice * item.quantity, 0)
            state.total = state.totalBeforeDiscount
        },
        updateQuantityDecrement: (state, action) => {
            const { id, size } = action.payload
            state.items = state.items.map(item => {
                if(item.id === id && item.size === size) {
                    item.quantityDecrement = item.quantity;
                }
                return item
            })
            state.discount = {}
            state.totalBeforeDiscount = state.items.reduce((acc, item) => acc + item.lastKnownPrice * item.quantity, 0)
            state.total = state.totalBeforeDiscount
        },
        updateDeliveryAddress: (state, action) => {
            state.deliveryAddress = action.payload;
        },
        removeDeliveryAddress: (state) => {
            state.deliveryAddress = {};
        },
        updateBillingAddress: (state, action) => {
            state.billingAddress = action.payload;
        },
        removeBillingAddress: (state) => {
            state.billingAddress = {};
        },
        updateIdPaymentIntent: (state, action) => {
            state.idPaymentIntent = action.payload;
            state.timestampPaymentIntent = Date.now() + 1800000;
        },
        removeIdPaymentIntent: (state) => {
            state.idPaymentIntent = null;
        },
        updateDiscount: (state, action) => {
            const { remise, type } = action.payload
            state.total = state.totalBeforeDiscount
            state.discount = {
                remise: remise,
                type: type
            }
            const deductedPrice = type === "euro" ? state.totalBeforeDiscount - remise : type === "pourcent" && state.totalBeforeDiscount - (state.totalBeforeDiscount * remise / 100)
            state.total = deductedPrice
        },
        expirePaymentIntent: (state) => {
            state.totalBeforeDiscount = state.items.reduce((acc, item) => acc + item.lastKnownPrice * item.quantity, 0)
            state.total = state.totalBeforeDiscount
            state.discount = {};
            state.deliveryAddress = {};
            state.billingAddress = {};
            state.idPaymentIntent = null;
            state.timestampPaymentIntent = null;
            state.infosCreditCard = {}
        },
        clearItems: (state) => {
            state.items = [];
            state.totalBeforeDiscount = 0;
            state.total = 0;
            state.discount = {};
            state.deliveryAddress = {};
            state.billingAddress = {};
            state.idPaymentIntent = null;
            state.timestampPaymentIntent = null;
            state.infosCreditCard = {}
        }
    }
})

export const { addItem, removeItem, updateItemQuantity, updateItemPrice, clearItems, updateDeliveryAddress, updateBillingAddress, removeDeliveryAddress, removeBillingAddress, updateIdPaymentIntent, updateDiscount, expirePaymentIntent, updateQuantityDecrement } = cartSlice.actions;

export const selectItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) => state.cart.items.reduce((acc, item) => acc + item.quantity, 0);
export const selectTotalBeforeDiscount = (state) => state.cart.totalBeforeDiscount;
export const selectTotal = (state) => state.cart.total;
export const selectDeliveryAddress = (state) => state.cart.deliveryAddress;
export const selectBillingAddress = (state) => state.cart.billingAddress;
export const selectIdPaymentIntent = (state) => state.cart.idPaymentIntent;
export const selectTimestampPaymentIntent = (state) => state.cart.timestampPaymentIntent;
export const selectDiscount = (state) => state.cart.discount;

export default cartSlice.reducer;