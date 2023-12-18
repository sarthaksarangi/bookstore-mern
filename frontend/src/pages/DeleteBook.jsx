import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();

  const handleDeleteBook = ()=>{
    setLoading(true);
    axios.delete(`http://localhost:5555/books/${id}`)
    .then(()=>{
      setLoading(false);
      enqueueSnackbar('Book deleted successfully!' ,{variant: "success"})
      navigate('/');
    })
    .catch((e)=>{
      setLoading(false);
      enqueueSnackbar('Error' ,{variant: "error"})
      console.log(e);
    })
  }
  return (
    <div>
      <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col items-center rounded-xl w-[600px] p-8 mx-auto shadow-lg border-2 border-gray-700'>
          <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
          <button className=' bg-red-500 text-white m-8 w-full p-2 rounded-xl'
          onClick={handleDeleteBook}
          > Yes, Delete it.</button>
         
          <button className=' bg-green-400 text-white m-3 p-2 rounded-xl w-full'
          onClick={()=>{navigate('/')}}
          >No</button>
          </div>
      )}
      </div>
    </div>
  )
}

export default DeleteBook
