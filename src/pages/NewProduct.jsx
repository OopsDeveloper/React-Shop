import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { uploadImage } from '../api/uploader';
import Swal from "sweetalert2";
import useProducts from '../hooks/useProducts';

export default function NewProduct() {
    const [product, setProduct] = useState({});
    const [file, setFile] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const { addProduct } = useProducts();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if(name === 'file') {
            setFile(files && files[0]);
            return;
        }
        
        setProduct((product) => ({ ...product, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsUploading(true);
        uploadImage(file)
            .then((url) => {
                addProduct.mutate(
                    {product, url},
                    {
                        onSuccess: () => {
                            Swal.fire({
                                title: "제품 등록 완료",
                                text: "제품이 등록되었습니다!",
                                icon: "success",
                                confirmButtonText: "확인"
                            });
                        }
                    }
                )
            })
            .finally(() => setIsUploading(false));
    }
    
    return (
        <section className='w-full text-center'>
            <h2 className='text-2xl font-bold my-4'>새로운 제품 등록</h2>
            {file && <img className='w-96 mx-auto mb-2' src={URL.createObjectURL(file)} alt='local file'/>}
            <form className='flex flex-col px-12' onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    accept='image/*' 
                    name='file' 
                    required 
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="title" 
                    value={product.title ?? ''} 
                    placeholder='제품명' 
                    required 
                    onChange={handleChange}
                />
                <input 
                    type="number" 
                    name="price" 
                    value={product.price ?? ''} 
                    placeholder='가격' 
                    required 
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="category" 
                    value={product.category ?? ''} 
                    placeholder='카테고리' 
                    required 
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="description" 
                    value={product.description ?? ''} 
                    placeholder='제품 설명' 
                    required 
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="options" 
                    value={product.options ?? ''} 
                    placeholder='옵션들(콤마(,)로 구분)' 
                    required 
                    onChange={handleChange}
                />
                <Button 
                    text={isUploading ? '업로드중...' : '제품 등록하기'}
                    disabled={isUploading}
                />
            </form>
        </section>
    );
}

