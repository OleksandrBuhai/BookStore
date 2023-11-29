import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

export default function CreateBooks() {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();


  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear
    };
    console.log(data)
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((error) => {
        setLoading(false);
      
        console.log(error);
      });
  }


  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            className='border-2 border-gray-500 px-4 py-2 w-full'
            value={title} onChange={(e) => { setTitle(e.target.value) }} />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            className='border-2 border-gray-500 px-4 py-2 w-full'
            value={author} onChange={(e) => { setAuthor(e.target.value) }} />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Year</label>
          <input
            className='border-2 border-gray-500 px-4 py-2 w-full'
            value={publishYear} onChange={(e) => { setYear(e.target.value) }} />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  )
}
