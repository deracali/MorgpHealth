import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('https://morgphealth.onrender.com/api/blogs')
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  return (
    <div className="font-ubuntu mb-20 mt-20">
      {/* Topbar */}
      <div className="flex justify-between items-center p-6 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white">
  <h1 className="text-5xl font-semibold tracking-wide cursor-pointer text-center md:text-left">
    Health <span className="text-yellow-300">Articles</span>
  </h1>
  <button className="text-right text-3xl md:hidden">
    <i className="fa fa-bars"></i>
  </button>
</div>


  

      <div className="p-4">
      

        {/* Blog Gallery */}
        <div className="">
  <ul className="mobile-grid-3 grid gap-4">
    {blogs.slice(0, 12).map((post, index) => (
      <li key={index} className="cursor-pointer relative border-4 border-white">
        <Link to={`/blogdetails/${post._id}`} className="w-full h-full block">
          <div
            className="w-full h-80 bg-cover bg-center text-white flex items-center justify-center"
            style={{ backgroundImage: `url(${post.imageUrl})` }}>
            <h3 className="text-2xl">{post.title}</h3>
          </div>
        </Link>
      </li>
    ))}
  </ul>
</div>
      </div>

    
    </div>
  );
};

export default BlogList;
