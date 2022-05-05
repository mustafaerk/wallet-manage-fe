import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    categoryName: "",
    date: "",
    price: "",
    description: "",
    type: ""
};

export const TransactionSlice = createSlice({
    name: "newTransaction",
    initialState,
    reducers: {
        updateTransactionField: (state, action) => {
            state.room[action.payload.field] = action.payload.value;
        },
    },
});


export const transactionInfo = (state) => state.newTransaction;

export const { updateTransactionField } = TransactionSlice.actions;

export const TransactionSliceReducer = TransactionSlice.reducer;
export const TransactionSliceReducerName = TransactionSlice.name;

export default TransactionSlice.reducer;
