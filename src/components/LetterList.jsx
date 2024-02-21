import styled from 'styled-components';
import { useSelector } from 'react-redux';
import LetterCard from './LetterCard';
import letters from '../store/modules/letterSlice';

export default function LetterList() {
    const activeMember = useSelector((state) => state.memberSlice);
    const letters = useSelector((state) => state.letterSlice);
    console.log('letters =>', letters);

    const filteredLetters = letters.filter((letter) => letter.writedTo === activeMember);
    return (
        <ListWrapper>
            {filteredLetters.length === 0 ? (
                <p>{activeMember}에게 남겨진 팬레터가 없습니다. 첫 번째 팬레터의 주인공이 돼보세요!</p>
            ) : (
                filteredLetters.map((letter) => <LetterCard key={letter.id} letter={letter} />)
            )}
        </ListWrapper>
    );
}

const ListWrapper = styled.ul`
    background-color: black;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 500px;
    border-radius: 12px;
    padding: 12px;
    color: white;
`;
