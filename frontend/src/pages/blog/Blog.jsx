import React from 'react';
import blogData from '../../data/blogs.json';

const Blog = () => {
  return (
    <section className="blog__section py-20 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="section__header text-4xl font-semibold  mb-4">Latest Blogs</h2>
        <p className="section__subheader text-xl  mb-10">
          Explore our latest articles and insights to stay updated with trends and tips!
        </p>
        <div className="blog__grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {blogData.map((blog, index) => (
            <div key={index} className="blog__card bg-white border rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity duration-300"
              />
              <div className="p-6">
                <h6 className="text-primary text-sm uppercase font-semibold mb-2">{blog.subtitle}</h6>
                <h4 className="text-lg font-bold mb-4">{blog.title}</h4>
                <p className="text-sm">{blog.date}</p>
                <p className="text-base mt-3">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
