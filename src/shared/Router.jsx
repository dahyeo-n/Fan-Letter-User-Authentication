import Detail from '../pages/Detail';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* withAuthorization: 로그인 된 상태에서 접근할 수 있는 페이지는 true, 로그인 상관 없이 접근 가능한 페이지는 false로 설정 */}
                <Route path="/" element={<Home />} withAuthorization={true} />
                <Route path="/detail/:id" element={<Detail />} withAuthorization={true} />
                <Route path="/login" element={<Login />} withAuthorization={false} />
                <Route path="/profile" element={<Profile />} withAuthorization={true} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}
