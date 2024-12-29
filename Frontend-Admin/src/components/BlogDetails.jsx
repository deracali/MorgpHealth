import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Import useParams from react-router-dom

export default function BlogDetails() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();  // Extract the 'id' from the URL params

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch all blog posts from the API
    axios.get('https://morgphealth.onrender.com/api/blogs')
      .then(response => {
        // Filter the blog post based on the 'id' from the URL params
        const filteredBlogs = response.data.filter(post => post._id === id);
        
        if (filteredBlogs.length > 0) {
          setBlog(filteredBlogs[0]); // Set the first blog from the filtered result
        } else {
          console.log('Blog not found');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching blog data:", error);
        setLoading(false);
      });
  }, [id]);  // Add 'id' to the dependency array so it re-fetches when the ID changes

  // Show loading message while fetching
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle case if no blog is found
  if (!blog) {
    return <div>Blog not found!</div>;
  }

  return (
    <>
      <div className="cs-blog mt-10 mb-8">
        <h2 className="text-xl tracking-tighter leading-7 mb-2 relative uppercase">{blog.title}</h2>
        <ul className="blog-list list-none mt-0 p-0 w-full">
          <li className="float-left mb-8">
            <figure className="relative overflow-hidden">
              <img src={blog.imageUrl} alt={blog.title} className="w-full" />
            </figure>
            <div className="cs-text border border-gray-100 p-4">
              <h5 className="border-b border-white text-lg mb-0 min-h-[56px] p-0 pb-1">
                <a href="#" className="text-gray-900">{blog.title}</a>
              </h5>
              <p className="mb-3">{blog.content}</p>
              <span className="text-sm text-gray-600 inline-block">author: {blog.author}</span>
            
            </div>
          </li>
        </ul>
      </div>

      <div className="cs-post-option-panel pt-5 mb-10">
            <span className="post-date inline-block text-xs text-gray-500">{new Date(blog.date).toLocaleDateString()}</span>
            <span className="post-category inline-block text-xs text-gray-500 ml-4">{blog.category}</span>
          </div>
    </>
  );
}
