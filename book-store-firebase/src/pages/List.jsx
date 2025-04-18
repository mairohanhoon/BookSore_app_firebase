import React, {useState} from 'react';
import {useFirebase} from '../context/Firebase';
import {useNavigate} from 'react-router-dom';

const ListingPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [isbnNumber, setIsbnNumber] = useState('');
    const [price, setPrice] = useState('');
    const [coverPhoto, setCoverPhoto] = useState(null);


    const firebase = useFirebase();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const file = coverPhoto;
        if(!file){
            alert('Please upload a cover photo');
            return;
        }
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "bookify_cloud");
        data.append("cloud_name", "dojqd1yzs");

        const res = await fetch('https://api.cloudinary.com/v1_1/dojqd1yzs/image/upload', {
            method: 'POST',
            body: data
        });
        const fileLink = await res.json();
        console.log(fileLink);
        await firebase.handleCreateNewListing(name, isbnNumber, price, fileLink.url);
        navigate('/');
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-slate-800'>
            <form className="max-w-sm mx-auto">
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Book Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="bookname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Book Name" required />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ISBN</label>
                <input value={isbnNumber} onChange={(e) => setIsbnNumber(e.target.value)} type="text" id="isbn" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ISBN Number" required />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" id="isbn" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Price" required />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Photo</label>
                <input type="file" name="coverPhoto" id="coverPhoto" onChange={(e) => setCoverPhoto(e.target.files[0])}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
            <button onClick={(e) => {handleSubmit(e)
            }} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}

export default ListingPage;