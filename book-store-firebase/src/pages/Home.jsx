import React, {useEffect, useState} from 'react';
import {useFirebase} from '../context/Firebase';
import BookCard from '../components/Card';
import {useNavigate} from 'react-router-dom';


const HomePage = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Only redirect if we're sure the user is not logged in
        if (!loading && !firebase.isLoggedIn) {
            navigate('/login');
        }
    }, [firebase.isLoggedIn, loading]);

    useEffect(() => {
        // Set loading to false after a short delay to allow Firebase to initialize
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!loading) {
            firebase.listAllBooks().then((books) => setBooks(books.docs));
        }
    }, [loading]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-md text-blue-700"></span>
            </div>
        );
    }
    
    return (
        <div className='flex flex-wrap gap-4 justify-center items-center mt-24'>
            {
                books.map((book) => (
                    <BookCard book={book} key={book.id} />
                ))
            }
        </div>
    )
}

export default HomePage;