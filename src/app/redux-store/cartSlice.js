import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify'

const initialState = {
    items: [],
    total: 0,
    deliveryAddress: {},
    billingAddress: {},
    idPaymentIntent: null
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
                    quantity: quantity,
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
            state.total = state.items.reduce((acc, item) => acc + item.lastKnownPrice * item.quantity, 0)
            toast.success(name + ' ajouté au panier !', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })
        },
        removeItem: (state, action) => {
            const { id, size } = action.payload
            state.items = state.items.filter(item => !(item.id === id && item.size === size));
            state.total = state.items.reduce((acc, item) => acc + item.lastKnownPrice * item.quantity, 0);
        },
        updateItemQuantity: (state, action) => {
            const { id, size, quantity } = action.payload
            state.items = state.items.map(item => {
                if(item.id === id && item.size === size) {
                    item.quantity = quantity;
                }
                return item;
            });
            state.total = state.items.reduce((acc, item) => acc + item.lastKnownPrice * item.quantity, 0);
        },
        updateItemPrice: (state, action) => {
            const { id, size, price } = action.payload
            state.items = state.items.map(item => {
                if(item.id === id && item.size === size) {
                    item.lastKnownPrice = price;
                }
                return item
            })
            state.total = state.items.reduce((acc, item) => acc + item.lastKnownPrice * item.quantity, 0);
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
        },
        removeIdPaymentIntent: (state) => {
            state.idPaymentIntent = null;
        },
        clearItems: (state) => {
            state.items = []
            state.total = 0
            state.deliveryAddress = {};
            state.billingAddress = {};
            state.idPaymentIntent = null;
        }
    }
})

export const { addItem, removeItem, updateItemQuantity, updateItemPrice, clearItems, updateDeliveryAddress, updateBillingAddress, removeDeliveryAddress, removeBillingAddress, updateIdPaymentIntent } = cartSlice.actions;

export const selectItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) => state.cart.items.reduce((acc, item) => acc + item.quantity, 0);
export const selectTotal = (state) => state.cart.total;
export const selectDeliveryAddress = (state) => state.cart.deliveryAddress;
export const selectBillingAddress = (state) => state.cart.billingAddress;
export const selectIdPaymentIntent = (state) => state.cart.idPaymentIntent;

export default cartSlice.reducer;