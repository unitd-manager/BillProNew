import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import api from '../constants/api';

const PosContext = createContext();

const initialState = { items: [] };

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.wish_list_id !== action.payload.wish_list_id) };
    case 'REMOVE_ITEM_CONTACT':
      return { ...state, items: state.items.filter(item => item.contact_id !== action.payload.contact_id) };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.wish_list_id === action.payload.id ? { ...item, ...action.payload.updates } : item
        ),
      };
    case 'GET_ITEM_BY_ID':
      return {
        ...state,
        selectedItem: state.items.find(item => item.wish_list_id === action.payload.id),
      };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  const fetchAllOrderItems = async (id) => {
    try {
      const response = await api.post('/finance/getOrdersByIds', { order_id: id });
      response.data.data.forEach(element => {
        element.tag = String(element.tag).split(",");
        element.images = String(element.images).split(",");
      });
      dispatch({ type: 'SET_ITEMS', payload: response.data.data });
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const addWishlistItem = async (item) => {
    try {
      const response = await api.post('/contact/insertToWishlist', item);
      dispatch({ type: 'ADD_ITEM', payload: response.data.data });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const removeWishlistItem = async (item) => {
    try {
      await api.post(`/contact/deleteWishlistItem`, { wish_list_id: item.wish_list_id });
      dispatch({ type: 'REMOVE_ITEM', payload: item });
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const removeWishlistItemContact = async (item) => {
    try {
      await api.post(`/contact/clearWishlistItems`, { contact_id: item.contact_id });
      dispatch({ type: 'REMOVE_ITEM_CONTACT', payload: item });
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const updateOrderItem = async (updatedData) => {
    try {
      const response = await api.post(`/poss/updateOrderItem`, updatedData);
      dispatch({ type: 'UPDATE_ITEM', payload: { id: updatedData.id, updates: response.data } });
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const getWishlistItemById = (id) => {
    const foundItem = state.items.find(item => item.wish_list_id === id);
    dispatch({ type: 'GET_ITEM_BY_ID', payload: { id } });
    return foundItem;
  };

  return (
    <PosContext.Provider value={{ wishlist: state.items, addWishlistItem, removeWishlistItemContact, removeWishlistItem, updateOrderItem, getWishlistItemById, fetchAllOrderItems }}>
      {children}
    </PosContext.Provider>
  );
};

WishlistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const usePos = () => useContext(PosContext);
