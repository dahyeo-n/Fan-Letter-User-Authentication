import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
import { jsonApi } from '../../api';
// import fakeData from '/src/fakeData.json';

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
const initialState = {
    letters: [],
    isLoading: true,
    isError: false,
    error: null,
};

const getLettersFromDB = async () => {
    const { data } = await jsonApi.get('/letters?_sort=createdAt&_order=desc');
    return data;
};

export const editLetterHandler = createAsyncThunk('editLetterHandler', async ({ id, editingText }, thunkAPI) => {
    try {
        await jsonApi.patch(`letters/${id}`, { content: editingText });
        const letters = await getLettersFromDB();
        return letters;
    } catch (arr) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const deleteLetterHandler = createAsyncThunk('deleteLetterHandler', async (id, thunkAPI) => {
    try {
        await jsonApi.delete(`/letters/${id}`);
        const letters = await getLettersFromDB();
        return letters;
    } catch (err) {
        return thunkAPI.rejectWithValue(arr);
    }
});

export const getletters = createAsyncThunk('getLetters', async (payload, thunkAPI) => {
    try {
        const letters = await getLettersFromDB();
        return letters;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

// thuck는 일종의 action creator
// : 경유지 역할
export const addLetterAsync = createAsyncThunk('addLetter', async (newLetter, thunkAPI) => {
    try {
        await jsonApi.post('/letters', newLetter);
        const letters = await getLettersFromDB();
        return letters;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

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
    // thunk를 쓸 때, 받아줄 수 있는 reducer는 extra임
    extraReducers: () => {
        addLetter(addLetterAsync.pending, (state) => {
            state.isLoading = true;
        });
        addLetter(addLetterAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.letters = action.payload; // action.payload가 data를 의미함
            state.isError = false;
            state.error = null;
        });
        addLetter(addLetterAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload; // action.payload는 위에 .rejectWithValue(err)를 의미
        });
        addLetter(getletters.pending, (state) => {
            state.isLoading = true;
        });
        addLetter(getletters.fulfilled, (state, action) => {
            state.isLoading = false;
            state.letters = action.payload; // action.payload가 data를 의미함
            state.isError = false;
            state.error = null;
        });
        addLetter(getletters.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload; // action.payload는 위에 .rejectWithValue(err)를 의미
        });
        addLetter(deleteLetterHandler.pending, (state) => {
            state.isLoading = true;
        });
        addLetter(deleteLetterHandler.fulfilled, (state, action) => {
            state.isLoading = false;
            state.letters = action.payload; // action.payload가 data를 의미함
            state.isError = false;
            state.error = null;
        });
        addLetter(deleteLetterHandler.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload; // action.payload는 위에 .rejectWithValue(err)를 의미
        });
        addLetter(editLetterHandler.pending, (state) => {
            state.isLoading = true;
        });
        addLetter(editLetterHandler.fulfilled, (state, action) => {
            state.isLoading = false;
            state.letters = action.payload; // action.payload가 data를 의미함
            state.isError = false;
            state.error = null;
        });
        addLetter(editLetterHandler.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload; // action.payload는 위에 .rejectWithValue(err)를 의미
        });
    },
});

export const { addLetter, deleteLetter, editLetter, getLetter } = letterSlice.actions;
export default letterSlice.reducer;
