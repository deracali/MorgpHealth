import React from 'react';

export default function UserDashboard() {
  return (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src='' alt='' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>Earnings</p>
            <p className='text-gray-400'>Earnings</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src='' alt='' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>Appointments</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src='' alt='' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>Patients</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src='' alt='' />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          <div className='flex items-center px-6 py-3 gap-3 hover-bg-gray-100'>
            <img className='rounded-full w-10' src='' alt='' />
            <div className='flex-1 text-sm'>
              <p className='text-gray-800 font-medium'>Name</p>
              <p className='text-gray-600'>Booking Date</p>
            </div>
            <p className='text-red-400 text-xs font-medium'>Cancelled</p>
          </div>
        </div>
      </div>
    </div>
  );
}
