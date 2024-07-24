import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createTabEmployee = createAsyncThunk(
  'Employee\createTabEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await api.post('/Employee\insertemployee',employeeData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTabEmployees = createAsyncThunk(
  'Employee\getTabEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/Employee\getTabEmployees');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTabEmployee = createAsyncThunk(
  'Employee\getTabEmployee',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/Employee\getTabEmployeesById',{employee_id:id});
      return response.data.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTabEmployee = createAsyncThunk(
  'Employee\deleteTabEmployee',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/Employee\deleteTabEmployee',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTabEmployee = createAsyncThunk(
  'Employee\updateTabEmployee',
  async (updatedTabEmployeeData, { rejectWithValue }) => {
    try {
      console.log(updatedTabEmployeeData);
      const response = await api.post('/Employee\edit-employee',
        // updatedTabEmployeeData.id,
        updatedTabEmployeeData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const tabEmployeeSlice = createSlice({
  name: 'employee',
  initialState: {
    tabEmployee: {},
    tabEmployees: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createTabEmployee.pending]: (state) => {
      state.loading = true;
    },
    [createTabEmployee.fulfilled]: (state, action) => {
      state.loading = false;

      state.employees = [...state.tabEmployees, action.payload];
    },
    [createTabEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTabEmployees.pending]: (state) => {
      state.loading = true;
    },
    [getTabEmployees.fulfilled]: (state, action) => {
      state.loading = false;
      state.tabEmployees = action.payload;
      state.tabEmployee = {};
    },
    [getTabEmployees.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTabEmployee.pending]: (state) => {
      state.loading = true;
    },
    [getTabEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.tabEmployee = action.payload;
    },
    [getTabEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteTabEmployee.pending]: (state) => {
      state.loading = true;
    },
    [deleteTabEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.tabEmployees = state.tabEmployees.filter((item) => item.id !== id);
      }
    },
    [deleteTabEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateTabEmployee.pending]: (state) => {
      state.loading = true;
    },
    [updateTabEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.tabEmployees.findIndex(
          (tabEmployee) => tabEmployee.id === action.payload.id
        );
        state.tabEmployees[index] = {
          ...state.tabEmployees[index],
          ...action.payload,
        };
      }
    },
    [updateTabEmployee.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default tabEmployeeSlice.reducer;