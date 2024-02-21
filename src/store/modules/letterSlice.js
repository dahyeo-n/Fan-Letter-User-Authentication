import { createSlice } from '@reduxjs/toolkit';
import fakeData from '/src/fakeData.json';

// // 팬레터 추가
// const ADD_LETTER = 'letters/ADD_LETTER';
// // 팬레터 삭제
// const DELETE_LETTER = 'letters/DELETE_LETTER';
// // 팬레터 수정
// const EDIT_LETTER = 'letters/EDIT_LETTER';

// export const letterSlice = createSlice;

// export const addLetter = (payload) => {
//     return { type: ADD_LETTER, payload };
// };
// export const deleteLetter = (payload) => {
//     return { type: DELETE_LETTER, payload };
// };
// export const editLetter = (payload) => {
//     return { type: EDIT_LETTER, payload };
// };

// const initialState = fakeData;

// const letters = (state = initialState, action) => {
//     switch (action.type) {
//         case ADD_LETTER:
//             const newLetter = action.payload;
//             return [newLetter, ...state];
//         case DELETE_LETTER:
//             const letterId = action.payload;
//             return state.filter((letter) => letter.id !== letterId);
//         case EDIT_LETTER:
//             const { id, editingText } = action.payload;
//             return state.map((letter) => {
//                 if (letter.id === id) {
//                     return { ...letter, content: editingText };
//                 }
//                 return letter;
//             });
//         default:
//             return state;
//     }
// };

// export default letters;

// 여기서부터 Redux-Toolkit으로 리팩토링
const initialState = fakeData;

const letterSlice = createSlice({
    name: 'letter',
    initialState,
    reducers: {
        addLetter(state, action) {
            const newLetter = action.payload;
            return [newLetter, ...state];
            // 이렇게도 쓸 수 있음. state는 letter가 담긴 배열임. unshift를 하면 newLetter를 letter 배열 앞에다가 집어넣음 (push는 뒤에 넣음 ㅇㅇ)
            // Redux-Toolkit에서만 가능. immer.js라는 내장된 라이브러리가 알아서 변환해줌
            // state.unshift(newLetter);
        },
        deleteLetter(state, action) {
            const letterId = action.payload;
            return state.filter((letter) => letter.id !== letterId);
        },
        editLetter(state, action) {
            const { id, editingText } = action.payload;
            return state.map((letter) => {
                if (letter.id === id) {
                    return { ...letter, content: editingText };
                }
                return letter;
            });
        },
    },
});

export const { addLetter, deleteLetter, editLetter } = letterSlice.actions;
export default letterSlice.reducer;
