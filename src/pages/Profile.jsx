import styled from 'styled-components';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { editProflie } from '../store/modules/authSlice';

function Profile() {
    const dispatch = useDispatch();
    const { avatar, nickname, UserId } = useSelector((state) => state.authSlice);
    const [isEditing, setIsEditing] = useState(false);
    const [editingText, setEditingText] = useState('');
    const [selectedImage, setSelectedImage] = useState(avatar);
    const [file, setFile] = useState(null);

    const previewImg = (event) => {
        const imgFile = event.target.files[0];
        if (imgFile.size > 1024 * 1024) {
            return alert('최대 1MB까지 업로드 가능합니다.');
        }
        setFile(imgFile);
        // preview logic
        // File → URL 형식으로 변환
        const imgURL = URL.createObjectURL(imgFile);
        console.log('imgURL: ', imgURL);
        setSelectedImage(imgURL);
    };
    // 프로필 변경 요청
    const onEditDone = () => {
        const formData = new FormData();
        if (editingText) {
            formData.append('nickname', editingText);
        }
        if (selectedImage !== avatar) {
            formData.append('avatar', file);
        }
        dispatch(editProflie(formData));
        setIsEditing(false);
        alert('프로필 변경이 완료되었습니다.');
    };

    return (
        <Container>
            <ProfileWrapper>
                <h1>프로필 관리</h1>
                <label>
                    <Avatar size="large" src={selectedImage} />
                    <input type="file" onChange={previewImg} accept="image/jpg, image/png" />
                </label>
                {isEditing ? (
                    <input autoFocus defaultValue={nickname} onChange={(e) => setEditingText(e.target.value)} />
                ) : (
                    <Nickname>{nickname}</Nickname>
                )}
                <UserId>{UserId}</UserId>
                {isEditing ? (
                    <div>
                        <Button text="취소" onClick={() => setIsEditing(false)} />
                        <Button
                            onClick={onEditDone}
                            text="수정완료"
                            disabled={!editingText && selectedImage === avatar}
                        />
                    </div>
                ) : (
                    <Button text="수정하기" onClick={() => setIsEditing(true)} />
                )}
            </ProfileWrapper>
        </Container>
    );
}

export default Profile;

const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProfileWrapper = styled.section`
    width: 500px;
    border-radius: 12px;
    background-color: lightgray;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    & > label > input {
        display: none;
    }

    & input {
        height: 24px;
        outline: none;
        padding: 6px 12px;
    }

    & h1 {
        font-size: 36px;
        font-weight: 700;
    }

    & div {
        display: flex;
        gap: 15px;
    }
`;

const Nickname = styled.span`
    font-size: 24px;
    font-weight: 700;
`;

const UserId = styled.span`
    font-size: 16px;
    color: gray;
`;
