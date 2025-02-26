import React, { useEffect, useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { login, logout, onUserStateChange } from '../api/firebase';
import User from './User';
import Swal from "sweetalert2";

export default function Navbar() {
    const [user, setUser] = useState();

    useEffect(() => {
        onUserStateChange(setUser)
    }, []);

    const handleLogin = () => {
        login((user) => {
            setUser(user);
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
            setUser(null);
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
                <h1>Shop</h1>
            </Link>
            <nav className='flex items-center gap-4 font-semibold'>
                <Link to='/products'>상품</Link>
                <Link to='/carts'>장바구니</Link>
                <Link to='/products/new' className='text-2xl'>
                    <BsFillPencilFill />
                </Link>
                {user && <User user={user} />}
                {!user && <button onClick={handleLogin}>로그인</button>}
                {user && <button onClick={handleLogout}>로그아웃</button>}
              
           </nav>
      </header>
    );
}

