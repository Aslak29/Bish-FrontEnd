import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify'

const initialState = {
    items: [],
    total: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            // code pour ajouter un produit au panier
            state.items.push({
                id: action.payload.id,
                quantity: action.payload.quantity,
                size: action.payload.size,
                lastKnownPrice: action.payload.price
            })
            state.total = 0
            state.items.map(item => state.total += item.lastKnownPrice)
            toast.success(action.payload.name + ' ajouté au panier !', { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" })

        },
        removeItem: (state, action) => {
            // code pour enlever un produit du panier
        },
        updateItemQuantity: (state, action) => {
            // code pour mettre à jour la quantité d'un produit dans le panier
        }
    }
})

export const { addItem, removeItem, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;