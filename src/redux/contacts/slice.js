import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, editContact, fetchContacts } from './operations';
import { logout } from '../auth/operations';
import toast from 'react-hot-toast';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const notifyDelete = () => toast.success('Contact successfully deleted');
const notifyAdd = () => toast.success('Contact successfully added');
const notifyEdit = () => toast.success('Contact successfully edited');


const slice = createSlice({
  name: 'contacts',

  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },


  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
        notifyAdd();
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(item => item.id !== action.payload);
        notifyDelete();
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(logout.fulfilled, state => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
      })
      .addCase(editContact.pending, handlePending)
      .addCase(editContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(contact => contact.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        notifyEdit();
      })
      .addCase(editContact.rejected, handleRejected);
  },
});


export default slice.reducer;