import { createSlice } from '@reduxjs/toolkit';

// const SET_MEMBER = "member/SET_MEMBER";

// export const setMember = (payload) => {
//   return { type: SET_MEMBER, payload };
// };

// const initialState = "카리나";

// const member = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_MEMBER:
//       const activeMember = action.payload;
//       return activeMember;
//     default:
//       return state;
//   }
// };

// export default member;

// 여기서부터 Redux-Toolkit으로 리팩토링
const initialState = '카리나';

const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        setMember(state, action) {
            const activeMember = action.payload;
            return activeMember;
        },
    },
});

// React 컴포넌트에서 action create를 써야 하기 때문에 memberSlice에서 action create인 setMember를 export
export const { setMember } = memberSlice.actions;
// store에서 memberSlice의 reducer를 가져오게 하기 위함
export default memberSlice.reducer;
