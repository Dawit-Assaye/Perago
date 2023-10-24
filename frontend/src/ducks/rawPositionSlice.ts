import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface Position {
  id: string;
  name?: string;
  description?: string;
  report_to?: string;
  parent_id: string | null;
}

type FormValuesRoot = {
  name: string;
  description: string;
};

type FormValuesChild = {
  name: string;
  description: string;
  report_to: string;
  parent_id: string | undefined;
};

// Define a type for the slice state
interface RawPositionState {
  value: Position[];
}

// Define the initial state using that type
const initialState: RawPositionState = {
  value: [],
};

export const rawPositionSlice = createSlice({
  name: "rawPosition",
  initialState,
  reducers: {
    setPositions: (
      state: RawPositionState,
      action: PayloadAction<Array<any>>
    ) => {
      state.value = action.payload;
    },

    updateRootPosition: (
      state: RawPositionState,
      action: PayloadAction<{ id: any; data: FormValuesRoot }>
    ) => {
      const { id, data } = action.payload;

      // Find the index of the item with the matching id
      const index = state.value.findIndex((item) => item.id === id);

      if (index !== -1) {
        // Create a new item with the updated data
        const updatedItem = {
          ...state.value[index],
          name: data.name,
          description: data.description,
        };

        // Update the state by replacing the item at the found index
        state.value[index] = updatedItem;
      }
    },

    updateChildPosition: (
      state: RawPositionState,
      action: PayloadAction<{ id: any; data: FormValuesChild }>
    ) => {
      const { id, data } = action.payload;

      //Find the index of the item with the matching id
      const index = state.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        //Create a new item with updated data
        const updatedItem = {
          ...state.value[index],
          name: data.name,
          description: data.description,
          report_to: data.report_to,
        };

        // Updated the state by replacing the item at the found index
        state.value[index] = updatedItem;
      }
    },

    deletePosition:(
      state:RawPositionState,
      action:PayloadAction<string|undefined>
      )=>{
      const idToDelete = action.payload;
// Recursively remove the position and its children
      const removePosition = (parentId: string | null | undefined) => {
        const newPositions = state.value.filter(
          (position) => position.parent_id !== parentId
        );

        state.value
          .filter((position) => position.parent_id === parentId)
          .forEach((child) => {
            removePosition(child.id);
          });

        state.value = newPositions;
      };

      removePosition(idToDelete);
      }
  },
});

export const {
  setPositions,
  updateRootPosition,
  updateChildPosition,
  deletePosition,
} = rawPositionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPosition = (state: RootState) => state.rawPosition.value;

export default rawPositionSlice.reducer;
