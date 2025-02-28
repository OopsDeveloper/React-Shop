import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import useCart from '../hooks/useCart';
import Swal from "sweetalert2";

export default function ProductDetail() {
    const { cartQuery, addOrUpdateItem } = useCart();
    const {
        state: {
            product: { id, image, title, description, category, price, options }
        }
    } = useLocation();

    const [selected, setSelected] = useState(options && options[0]);

    const handleSelect = (e) => setSelected(e.target.value);

    const handleClick = () => {
        const product = { id, image, title, price, option: selected, quantity: 1 };

        const isAlreadyInCart = cartQuery.data?.some(
            (item) => item.id === product.id && item.option === product.option
        );

        if (isAlreadyInCart) {
            addOrUpdateItem.mutate(product, {
                onSuccess: () => {
                    Swal.fire({
                        title: "장바구니 추가",
                        text: "상품 수량이 증가되었습니다!",
                        icon: "success",
                        confirmButtonText: "확인"
                    })
                }
            });
            return;
        }

        addOrUpdateItem.mutate(product, {
            onSuccess: () => {
                Swal.fire({
                    title: "장바구니 추가",
                    text: "장바구니에 추가되었습니다!",
                    icon: "success",
                    confirmButtonText: "확인"
                })
            }
        });
    }

    return (
        <section>
            <p className='mx-12 mt-4 text-gray-700'>{category}</p>
            <section className='flex flex-col md:flex-row p-4'>
                <img className='w-full px-4 basis-7/12' src={image} alt={title} />
                <div className='w-full basis-5/12 flex flex-col p-4'>
                    <h2 className='text-3xl font-bold py-2'>{title}</h2>
                    <p className='text-2xl font-bold py-2 border-b border-gray-400'>{`${price}원`}</p>
                    <p className='py-4 text-lg'>{description}</p>
                    <div className='flex items-center'>
                        <label className='text-brand font-bold' htmlFor='select'>옵션:</label>
                        <select 
                            className='p-2 m-4 flex-1 border-2 border-solid border-brand outline-none'
                            id='select' 
                            onChange={handleSelect} 
                            value={selected}
                        >
                            {options 
                                && options.map((option, index) => (
                                        <option key={index}>{option}</option>
                                    ))}
                        </select>
                    </div>
                    <Button text="장바구니에 추가" onClick={handleClick} />
                </div>
            </section>
        </section>
    );
}

