// import { useState } from 'react';
// import { Navigate } from 'react-router-dom';

// // PrivateRoute 컴포넌트
// export function PrivateRoute({ children }) {
//     const [isLogin] = useState(true); // 여기서 로그인 상태를 실제로 확인하는 로직으로 대체하세요.
//     return isLogin ? children : <Navigate replace to="/login" />;
// }

// // PublicRoute 컴포넌트
// export function PublicRoute({ children }) {
//     const [isLogin] = useState(false); // 여기서 로그인 상태를 실제로 확인하는 로직으로 대체하세요.
//     return !isLogin ? children : <Navigate replace to="/" />;
// }
