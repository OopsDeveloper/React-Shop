import React from 'react';

export default function PriceCard({ text, price }) {
    return (
        <div className='bg-gray-50 p-8 mx-2 rounded-2xl text-center text-lg md:text-xl w-full text-center md:w-auto'>
            <p>{text}</p>
            <p className='font-bold text-brand text-xl md:text-2xl'>{price}원</p>
        </div>
    );
}

