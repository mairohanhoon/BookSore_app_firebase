import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const BookDetailPage = () => {
  const params = useParams();
  const firebase = useFirebase();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
//   console.log(params);
//   console.log(book);

  useEffect(() => {
    firebase.getBookById(params.bookId).then((result) => {
      setBook(result.data());
    });
  }, []);
  if (book === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-md text-blue-700"></span>
      </div>
    );
  }
  const handleBuyNow = async () => {
    if (quantity < 1 || quantity > 10) {
      alert("Quantity must be between 1 to 10");
      return;
    }
    const result = await firebase.placeOrder(params.bookId, quantity);
    console.log("Order Placed", result);
  }
  return (
    <div className="flex flex-col items-center justify-center mt-24">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            className="rounded-t-lg h-auto w-full object-contain"
            src={book.coverPhotoURL ? book.coverPhotoURL : "https://img.icons8.com/?size=100&id=71733&format=png&color=000000"}
            alt="book"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold">{book.name}</h2>
          <h2 className="card-title text-xl font-bold">Details</h2>
          <h2 className="card-title text-sm font-semibold">Price: {book.price}</h2>
          <h2 className="card-title text-xl font-bold">Owner Details</h2>
          <div className="flex items-center gap-2">
          <img src={book.photoURL} alt="owner pic" className="w-10 h-10 rounded-full" />
            <p>{book.userEmail}</p>
          </div>
          <p>Name: {book.displayName}</p>
          <p>ISBN: {book.isbn}</p>
          <div>
            <input onChange={(e) => setQuantity(e.target.value)} type="number" className="input validator" required placeholder="Quantity" min="1" max="10" title="Quantity must be between 1 to 10" defaultValue={1} />
                <p className="validator-hint">Quantity must be between 1 to 10</p>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
