import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        add:(state,action)=>{
            const poster=action.payload;
            state.push(poster);
        },
        remove:(state,action)=>{
            return state.filter((item)=> item.id !== action.payload)
        }
    }
});

export const {add,remove} = cartSlice.actions;
export default cartSlice.reducer;



// Code for when poster api is made with quantity parameters
// import { createSlice } from "@reduxjs/toolkit";

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState: [],
//   reducers: {
//     add: (state, action) => {
//       const poster = action.payload;
//       const existingItem = state.find((item) => item.id === poster.id);
//       if (existingItem) {
//         // If product already exists, increase quantity
//         existingItem.quantity += 1;
//       } else {
//         // Otherwise, add new product with quantity 1
//         state.push({ ...poster, quantity: 1 });
//       }
//     },
//     remove: (state, action) => {
//       const productId = action.payload;
//       const existingItem = state.find((item) => item.id === productId);
//       if (existingItem) {
//         if (existingItem.quantity > 1) {
//           // Decrease quantity if more than 1
//           existingItem.quantity -= 1;
//         } else {
//           // Remove item if quantity reaches 0
//           return state.filter((item) => item.id !== productId);
//         }
//       }
//     },
//   },
// });

// export const { add, remove } = cartSlice.actions;
// export default cartSlice.reducer;
