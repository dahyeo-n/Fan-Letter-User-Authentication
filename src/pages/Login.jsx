import styled from 'styled-components';
import Button from '../components/common/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/modules/authSlice';
import { toast } from 'react-toastify';
import useForm from '../hooks/useForm';

function Login() {
    const dispatch = useDispatch();
    const [isLoginMode, setIsLoginMode] = useState(true);
    // const [formState, setFormState] = useState(initialState);
    const { formState, onChangeInputHandler, resetForm } = useForm({
        id: '',
        password: '',
        nickname: '',
    });
    const { id, password, nickname } = formState;

    // const onChangeInputHandler = (e) => {
    //    const { name, value } = e.target;
    //    setFormState((prev) => ({ ...prev, [name]: value }));
    // };

    const onSubmitHandler = (e) => {
        // 새로고침 막음
        e.preventDefault();
        console.log('제출');
        if (isLoginMode) {
            // 로그인 처리
            dispatch(login());
            alert('성공적으로 로그인되었습니다.');
        } else {
            // 회원가입
            setIsLoginMode(true);
            resetForm();
            alert('회원가입 하셨습니다.');
        }
    };

    return (
        <Container>
            <Form onSubmit={onSubmitHandler}>
                <Title>{isLoginMode ? '로그인' : '회원가입'}</Title>
                <Input
                    name="id"
                    value={id}
                    onChange={onChangeInputHandler}
                    placeholder="아이디 4~10글자를 입력해주세요."
                    minLength={4}
                    maxLength={10}
                />
                <Input
                    name="password"
                    value={password}
                    onChange={onChangeInputHandler}
                    placeholder="비밀번호 4~15글자를 입력해주세요."
                    minLength={4}
                    maxLength={15}
                />
                {!isLoginMode && (
                    <Input
                        name="nickname"
                        value={nickname}
                        onChange={onChangeInputHandler}
                        placeholder="닉네임 1~10글자를 입력해주세요."
                        minLength={1}
                        maxLength={10}
                    />
                )}
                <Button
                    disabled={isLoginMode ? !id || !password : !id || !password || !nickname}
                    text={isLoginMode ? '로그인' : '회원가입'}
                    size="large"
                />
                <ToggleText>
                    <span onClick={() => setIsLoginMode((prev) => !prev)}>{!isLoginMode ? '로그인' : '회원가입'}</span>
                </ToggleText>
            </Form>
        </Container>
    );
}

const Container = styled.div`
    background-color: lightgray;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Form = styled.form`
    background-color: white;
    width: 500px;
    border-radius: 12px;
    padding: 12px;
    font-size: 16px;
`;

const Title = styled.h1`
    font-size: 36px;
    margin-bottom: 24px;
`;

const Input = styled.input`
    border: none;
    border-bottom: 1px solid gray;
    width: 100%;
    display: block;
    margin-bottom: 24px;
    padding: 12px 0;
    outline: none;
`;

const ToggleText = styled.div`
    text-align: center;
    width: 100%;
    margin-top: 24px;
    & span {
        color: lightgray;
        user-select: none;
        cursor: pointer;
        &:hover {
            color: black;
        }
    }
`;

export default Login;
