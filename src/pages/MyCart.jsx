import React from 'react';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Swal from "sweetalert2";
import useCart from '../hooks/useCart';

const SHIPPING = 3000;

export default function MyCart() {
    const { 
        cartQuery: { isLoading, data: products }
    } = useCart();

    if(isLoading) return <p>Loading...</p>;

    const hasProducts = products && products.length > 0;
    const totalPrice = products && products.reduce(
        (prev, current) => prev + parseInt(current.price) * current.quantity,
        0      
    );

    const handleClick = () => {
        Swal.fire({
            title: "주문 완료",
            text: "주문이 완료되었습니다!",
            icon: "success",
            confirmButtonText: "확인"
        });
    }

    return (
        <section className='p-8 flex flex-col'>
            <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>내 장바구니</p>
            {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
            {hasProducts && (
                <>
                    <ul className='border-b border-gray-300 mb-8 px-8'>
                        {products && products.map((product) => (
                            <CartItem key={product.productKey} product={product} />
                        ))}
                    </ul>
                    <div className='flex flex-wrap justify-between md:justify-center items-center mb-6 px-2 md:px-8 lg:px-16'>
                        <PriceCard text="상품 총액" price={totalPrice} />
                        <BsFillPlusCircleFill className='shrink-0 w-full text-center md:w-auto' />
                        <PriceCard text="배송액" price={SHIPPING} />
                        <FaEquals className='shrink-0 w-full text-center md:w-auto'/>
                        <PriceCard text="총가격" price={totalPrice + SHIPPING} />
                    </div>
                    <Button text='주문하기' onClick={handleClick} />
                </>
            )}
        </section>
    );
}

