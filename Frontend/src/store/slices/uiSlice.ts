import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface DialogState {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm?: () => void;
}

interface UIState {
    dialog: DialogState;
}

const initialState: UIState = {
    dialog: {
        isOpen: false,
        title: '',
        message: '',
    },
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        showDialog: (
            state,
            action: PayloadAction<{ title: string; message: string; onConfirm?: () => void }>
        ) => {
            state.dialog.isOpen = true;
            state.dialog.title = action.payload.title;
            state.dialog.message = action.payload.message;
            state.dialog.onConfirm = action.payload.onConfirm;
        },
        hideDialog: (state) => {
            state.dialog.isOpen = false;
        },
    },
});

export const { showDialog, hideDialog } = uiSlice.actions;
export default uiSlice.reducer;
