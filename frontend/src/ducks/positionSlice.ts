import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

interface Position {
  id: string;
  text: string;
}

interface PositionsState {
  positions: Position[];
}

const initialState: PositionsState = {
  positions: [],
};

 const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    addPosition: (state, action: PayloadAction<string>) => {
      const position: Position = {
        id: nanoid(),
        text: action.payload,
      };
      state.positions.push(position);
    },
  },
});

const { actions, reducer } = positionSlice;
export const { addPosition } = actions;
export default reducer;