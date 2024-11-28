import React from 'react'

function DeleteTask({ setForm }) {
    return (
        <div className='h-[130px] w-[450px] absolute top-0 bottom-0 left-1/2 right-1/2 bg-[#ffffff] -translate-x-40 translate-y-28 rounded-lg shadow-xl shadow-gray-500 border border-gray-400 px-4 py-3'>
            <div className='grid gap-1'>
                <h5>Delete Task?</h5>
                <p>The <span className='font-semibold'>HHH</span> task will be permanently deleted.</p>
            </div>
            <div className='flex justify-end mt-4 gap-2'>
                <button onClick={() => setForm(false)} className='bg-gray-100 px-2 py-1 rounded text-gray-800 hover:bg-gray-300'>Cancel</button>
                <button className='bg-red-500 px-2 py-1 rounded text-[#fff] hover:bg-red-600'>Delete</button>
            </div>
        </div>
    )
}

export default DeleteTask