import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi, jsonApi } from '../../api';

const initialState = {
    // isLogin: false,
    isLogin: !!localStorage.getItem('acceseToken'),
    avatar: localStorage.getItem('avatar'),
    nickname: localStorage.getItem('nickname'),
    userId: localStorage.getItem('userId'),
    isLoading: false,
    isError: false,
    error: null,
};

export const editProflie = createAsyncThunk('editProfile', async (formData, thunkAPI) => {
    try {
        const { data } = await authApi.patch('/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const editingObj = {};
        const { nickname, avatar } = data;
        if (nickname) editingObj.nickname = nickname;
        if (avatar) editingObj.avatar = avatar;

        // JSON 서버에 내 팬레터들의 닉네임과 아바타 변경
        const userId = localStorage.getItem('userId');
        const { data: myLetters } = await jsonApi.get(`/letters?userId=${userId}`);
        for (const myLetter of myLetters) {
            await jsonApi.patch(`/letters/${myLetter.id}`, editingObj);
        }

        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const loginHandler = createAsyncThunk('login', async ({ id, password }, thunkAPI) => {
    try {
        // const { data } = await axios.post('https://moneyfulpublicpolicy.co.kr/login', {
        const { data } = await authApi.post('/login?expiresIn=10m', {
            id,
            password,
        });
        if (data.success) {
            alert('성공적으로 로그인되었습니다.');
            const { accessToken, avatar, nickname, userId } = data;
            // localStorage.setItem('accessToken'), data.accessToken;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('avatar', avatar);
            localStorage.setItem('nickname', nickname);
            localStorage.setItem('userId', userId);
            return { accessToken: data.accessToken, avatar: data.avatar, nickname: data.nickname, userId: data.userId };
        }
    } catch (err) {
        alert(err.response.data.message);
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Reducer logic remains the same
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginHandler.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginHandler.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLogin = true;
                const { accessToken, avatar, nickname, userId } = action.payload;
                state.avatar = avatar;
                state.nickname = nickname;
                state.userId = userId;
            })
            .addCase(loginHandler.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload.message;
            })
            .addCase(editProflie.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editProflie.fulfilled, (state, action) => {
                const { avatar, nickname } = action.payload;
                if (avatar) {
                    localStorage.setItem('avatar', avatar);
                    state.avatar = avatar;
                }
                if (nickname) {
                    localStorage.setItem('nickname', nickname);
                    state.nickname = nickname;
                }
                state.isLoading = false;
            })
            .addCase(editProflie.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload.message;
            });
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
