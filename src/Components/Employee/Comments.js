import React, { useEffect, useState } from "react";
import axios from "axios";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Fab from '@mui/material/Fab';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';

function Comments() {
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");

  
  const fetchComments = async () => {
    try {
      const response = await axios.get("https://of-management-backend-4.onrender.com/api/comments");
      setComments(response.data.map(comment => ({ id: comment._id, text: comment.text, likes: comment.likes || 0, liked: false })));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      try {
        const response = await axios.post("https://of-management-backend-4.onrender.com/api/comments", {
          text: inputValue,
        });
        setComments([...comments, { id: response.data._id, text: response.data.text, likes: 0, liked: false }]);
        setInputValue("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://of-management-backend-4.onrender.com/api/comments/${id}`);
      setComments(comments.filter(comment => comment.id !== id));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  
  const handleLikeToggle = (id) => {
    setComments(comments.map(comment => {
      if (comment.id === id) {
        return {
          ...comment,
          liked: !comment.liked,
          likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
        };
      }
      return comment;
    }));
  };

  return (
    <div className="flex-1 mt-24 ml-20 md:ml-[300px] text-black max-w-full md:max-w-4xl  md:p-6 shadow-2xl absolute bg-gray-300 md:w-[900px]">
    <div className="max-w-lg  p-2 ">
    <h1 className="text-2xl font-bold mb-4 ml-7 p-2 rounded">Comments</h1>
      
      <div className="bg-gray-100 ml-10 md:w-[750px] p-4 rounded h-72 overflow-auto">
       
        <ul>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <li
                key={comment.id}
                className="border-b border-gray-300 py-2 flex justify-between items-center"
              >
                <span>- {comment.text}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => handleLikeToggle(comment.id)}
                   
                  >
                    {comment.liked ? <Fab 
      sx={{
        width:30,height:30,mr:4,
        backgroundColor: 'red',
        '&:hover': {
          backgroundColor: 'red',
        },
      }}
    >
      <FavoriteBorderIcon 
        sx={{width:20,height:20,
          backgroundColor: 'white',
          borderRadius: '50%',
          padding: '4px', 
        }} 
      />
    </Fab> : <Fab sx={{ width:30,height:30,mr:4}}><FavoriteBorderIcon sx={{width:20,height:20}}/> </Fab>}
                  </button>
                  <button
                    onClick={() => handleDelete(comment.id)}
                  
                  >
                      <Fab color="secondary" sx={{backgroundColor: 'Darkred',
        '&:hover': {
          backgroundColor: 'red',
        }, width:30,height:30}} >
                      <DeleteSweepOutlinedIcon sx={{width:20,height:20}} />
                      </Fab>
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li>Not Comments</li>
          )}
        </ul>
      </div>
    

    </div>
    <form onSubmit={handleSubmit} className="relative mb-4 flex flex-col md:flex-row ml-12">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter Comments..."
          className="border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full md:w-[570px] mb-2 md:mb-0 mr-5"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2 md:mb-0 md:w-[160px]"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Comments;
