import { useState, useEffect } from "react";
import React from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BookCard from "../components/home/BookCard";
import BookTable from "../components/home/BookTable";
const Home = () => { 
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4 font-sans">
      <div className="flex justify-center items-center gap-x-5">
        <button className=" bg-sky-500  text-white px-7 py-2 mx-2 rounded-3xl  ease-in-out duration-300  hover:scale-110 hover:bg-sky-600 font-bold "
        onClick={()=>{setShowType('table')}}>
          Table
        </button>
        <button className=" bg-blue-500  hover:bg-blue-600 text-white px-7 py-2 mx-2  rounded-3xl ease-in-out duration-300  hover:scale-110 font-bold"
        onClick={()=>{setShowType('card')}}>
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-4 font-bold">Book's List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className=" text-sky-800 text-4xl " />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        showType==='table'?(<BookTable books ={books}/>):(<BookCard books ={books}/>)
        
      )}
    </div>
  );
};

export default Home;
