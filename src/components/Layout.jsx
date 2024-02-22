import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../store/modules/authSlice';

function Layout() {
    const dispatch = useDispatch();

    return (
        <>
            <Header>
                <Link to="/">Home</Link>
                <div>
                    <Link to="/profile">My Profile</Link>
                    <Link onClick={() => dispatch(logout())}>Logout</Link>
                </div>
            </Header>
            <Outlet />
        </>
    );
}

export default Layout;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 30px;
    height: 30px;
    background-color: gray;
    user-select: none;
    & a {
        text-decoration: none;
        color: inherit;
        &:hover {
            color: white;
        }
    }
    & div a:nth-child(2) {
        margin-left: 30px;
    }
`;
