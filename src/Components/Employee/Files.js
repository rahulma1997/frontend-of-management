import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Pagination from '@mui/material/Pagination';

const Files = () => {
  const [files, setFiles] = useState([]);
  const [fileInput, setFileInput] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 5;

 
  const fetchFiles = async () => {
    try {
      const response = await axios.get('https://of-management-backend-4.onrender.com/api/files');
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles(); 
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setSelectedFile(selectedFiles[0]); 
    setFileInput(null);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post('https://of-management-backend-4.onrender.com/api/upload', formData);
      fetchFiles();
      if (fileInput) fileInput.value = "";
      
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileDelete = async (index) => {
    const fileToDelete = files[index];
    try {
      await axios.delete(`https://of-management-backend-4.onrender.com/api/files/${fileToDelete._id}`);
     
      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };


  const totalPages = Math.ceil(files.length / filesPerPage);
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const currentFiles = files.slice((currentPage - 1) * filesPerPage, currentPage * filesPerPage);

  return (
    <div className="flex-1 ml-0 md:ml-[200px] mt-6 md:mt-24 max-w-full md:max-w-4xl p-4 md:p-6 bg-slate-300 shadow-2xl absolute">
      <div className="max-w-lg mx-auto p-5">
        <h1 className="text-2xl font-bold mb-5">Upload Files</h1>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4"
          ref={(ref) => setFileInput(ref)}
        />
        <button
          onClick={handleFileUpload}
          className="bg-blue-500 text-white py-2 px-4 rounded">
          Add File
        </button>
        
        <div className='bg-gray-400'>
          <h2 className="text-xl font-semibold p-3 mt-5">Uploaded Files:</h2>
          <table  className="min-w-full bg-gray-200 ">
            <thead>
              <tr>
              <th className="py-2 px-4 border-b text-left ">S.No</th>
                <th className="py-2 px-4 border-b text-left ">File Name</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentFiles.map((file, index) => (
                <tr key={file._id} className="border-b ">
                  <td className="py-2 px-4">{(currentPage - 1) * filesPerPage + index + 1}</td>
                  <td className="py-2 px-4  ">{file.name}</td>
                  <td className="py-2 px-4 ">
                    <a
                      href={`https://of-management-backend-4.onrender.com/api/download/${file.name}`}
                      className="text-blue-500 hover:underline mr-4">
                      <DownloadForOfflineIcon />
                    </a>
                    <button
                      onClick={() => handleFileDelete((currentPage - 1) * filesPerPage + index)}
                      className="text-red-500 hover:underline">
                      <DeleteForeverIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            variant="outlined"
            color="primary"
            className="mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Files;
