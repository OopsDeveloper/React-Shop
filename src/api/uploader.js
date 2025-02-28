export async function uploadImage(file) {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);
    return await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
        method: 'POST',
        body: data
    })
        .then(res => res.json())
        .then((data) => {
            const originalUrl = data.url;
            const resizedUrl = originalUrl.replace("/upload/","/upload/w_490,h_621,c_fill/")
            return resizedUrl;
        });
}