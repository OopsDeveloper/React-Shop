import React from 'react';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import useCart from '../hooks/useCart';

const ICON_CLASS = 'transition-all cursor-poiner hover:text-brand hover:scale-105 mx-1'

export default function CartItem({ 
    product, 
    product: { image, title, option, quantity, price, productKey},
}) {
    const { updateCartItem, removeItem } = useCart();
    const handleMinus = () => {
        if(quantity < 2) return;
        updateCartItem.mutate({...product, quantity: quantity - 1});
    };
    
    const handlePlus = () => updateCartItem.mutate({...product, quantity: quantity + 1});
   
    const handleDelete = () => {
        return removeItem.mutate(productKey);
    }
    return (
        <li className='flex flex-col md:flex-row justify-between my-2 items-center'>
            <img className='w-24 md:w-48 rounded-lg mx-5' src={image} alt={title} />
            <div className='flex-1 flex flex-col md:flex-row justify-between items-center'>
                <div className='basis-3/5 w-full flex flex-col items-center md:items-start'>
                    <p className='text-lg'>{title}</p>
                    <p className='text-xl font-bold text-brand'>{option}</p>
                    <p>{price}원</p>
                </div>
            </div>
            <div className='text-2xl flex items-center'>
                <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
                <span>{quantity}</span>
                <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus} />
                <RiDeleteBin5Fill className={ICON_CLASS} onClick={handleDelete} />
            </div>
        </li>
    );      
}

