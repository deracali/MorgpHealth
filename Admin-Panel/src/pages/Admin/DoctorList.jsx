import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

export default function DoctorList() {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);
  const [loading, setLoading] = useState(false); // To track loading state
  const [page, setPage] = useState(1); // Pagination page
  const [error, setError] = useState(null); // Error state
  const [hasMore, setHasMore] = useState(true); // To track if there are more doctors to load
  const navigate = useNavigate();

  // Fetch doctors on mount and when page changes
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const newDoctors = await getAllDoctors(page);
        if (newDoctors.length < 10) {
          setHasMore(false); // If less than 10 doctors, there are no more to load
        }
      } catch (err) {
        setError('Failed to load doctors. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [page, getAllDoctors]);

  // Handle scroll event to trigger loading more data
  const handleScroll = debounce((e) => {
    const threshold = 100; // Trigger loading more when near the bottom
    const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + threshold;
    if (bottom && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1); // Load more doctors
    }
  }, 200);

  // Handle availability change
  const handleAvailabilityChange = (doctorId) => {
    changeAvailability(doctorId); // Update doctor availability
  };

  // Retry function
  const handleRetry = () => {
    setError(null);
    setPage(1);
    setHasMore(true);
  };

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll' onScroll={handleScroll}>
      <h1 className='text-lg font-medium'>All Doctors</h1>

      {error && (
        <div className="error-message">
          <p className="text-red-600 font-semibold">{error}</p>
          <button
            onClick={handleRetry}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Retry
          </button>
        </div>
      )}

      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/doctor-profile/${item?._id}`)}
            className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group'
          >
            <img
              className='bg-indigo-50 group-hover:bg-primary transition-all duration-500'
              src={item?.image}
              alt=''
            />
            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{item?.name}</p>
              <p className='text-zinc-600 text-sm'>{item?.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input
                  onChange={() => handleAvailabilityChange(item._id)}
                  type='checkbox'
                  checked={item.available}
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}

        {/* Loading spinner while fetching data */}
        {loading && (
          <div className="loading-spinner">
            <p>Loading...</p>
          </div>
        )}

        {/* Display this message when no more data is available */}
        {!loading && !hasMore && (
          <div className="no-more-doctors">
            <p>No more doctors to show.</p>
          </div>
        )}
      </div>
    </div>
  );
}
