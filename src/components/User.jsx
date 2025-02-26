import React from 'react';

export default function User({ user }) {
    if(!user) return <div>유저 정보 없음</div>;

    const { photoURL, displayName } = user;
    
    return (
        <div className='flex items-center'>
            <img 
                className='w-10 h-10 rounded-full mr-2' 
                src={photoURL || "https://via.placeholder.com/40"} 
                alt={displayName || "User"} 
            />
            <span className='hidden md:block'>{displayName || "User"}</span>
        </div>
    );
}

