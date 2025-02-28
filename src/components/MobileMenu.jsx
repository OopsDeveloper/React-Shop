import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import CartStatus from './CartStatus';
import { BiStore } from 'react-icons/bi';
import { BsFillPencilFill } from 'react-icons/bs';

export default function MobileMenu({ menuOpen, setMenuOpen, user, handleLogin, handleLogout }) {
    return (
            <div className={`fixed top-0 left-0 w-full bg-black bg-opacity-50 z-50 
                            transition-transform duration-300 ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
            <button
                className="absolute top-4 right-4 text-white text-3xl"
                onClick={() => setMenuOpen(false)}
            >
                <FaTimes />
            </button>

            <div className="bg-gray-900 w-full max-h-[80vh] p-6 rounded-b-lg overflow-y-auto 
                flex flex-col items-center gap-4 shadow-lg">
                <Link to="/" className="text-white text-3xl flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                    <FiShoppingBag />
                    <h1>React-Shop</h1>
                </Link>
                
                <Link to="/products" className="text-white text-2xl flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                    <BiStore /> 상품
                </Link>

                {user && (
                    <Link to="/carts" className="text-white text-2xl flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                        <CartStatus /> 장바구니
                    </Link>
                )}

                {user && user.isAdmin && (
                    <Link to="/products/new" className="text-white text-2xl flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                        <BsFillPencilFill /> 상품 등록
                    </Link>
                )}

                {!user && (
                    <button className="bg-green-500 text-white py-2 px-4 rounded-lg" onClick={() => { handleLogin(); setMenuOpen(false); }}>
                        로그인
                    </button>
                )}

                {user && (
                    <button className="bg-red-500 text-white py-2 px-4 rounded-lg" onClick={() => { handleLogout(); setMenuOpen(false); }}>
                        로그아웃
                    </button>
                )}
            </div>
        </div>
    );
}
