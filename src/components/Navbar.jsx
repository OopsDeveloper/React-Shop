import React, { useEffect, useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { login, logout, onUserStateChange } from '../api/firebase';
import User from './User';

export default function Navbar() {
    const [user, setUser] = useState();

    useEffect(() => {
        onUserStateChange(setUser)
    }, []);

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
                {!user && <button onClick={login}>로그인</button>}
                {user && <button onClick={logout}>로그아웃</button>}
              
           </nav>
      </header>
    );
}

