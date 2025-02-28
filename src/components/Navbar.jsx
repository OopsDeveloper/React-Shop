import React from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';
import CartStatus from './CartStatus';

export default function Navbar() {
    const { user, login, logout } = useAuthContext();
    const handleLogin = () => {
        login((user) => {
            Swal.fire({
                title: "로그인 성공!",
                text: `${user.displayName}님 환영합니다!`,
                icon: "success",
                confirmButtonText: "확인"
            });
        });
    }

    const handleLogout= () => {
        logout(() => {
            Swal.fire({
                title: "로그아웃 완료",
                text: "다음에 또 만나요!",
                icon: "info",
                confirmButtonText: "확인"
            });
        });
    }

    return (
        <header className='flex justify-between border-b border-gray-300 p-2'>
            <Link to='/' className='flex items-center text-4xl text-brand'>
                <FiShoppingBag />
                <h1>React-Shop</h1>
            </Link>
            <nav className='flex items-center gap-4 font-semibold'>
                <Link to='/products'>상품</Link>
                {user && <Link to='/carts'><CartStatus /></Link>}
                {user && user.isAdmin && (
                    <Link to='/products/new' className='text-2xl'>
                        <BsFillPencilFill />
                    </Link>
                )}
                {user && <User user={user} />}
                {!user && <Button text={'로그인'} onClick={handleLogin} />}
                {user && <Button text={'로그아웃'} onClick={handleLogout} />}
           </nav>
      </header>
    );
}

