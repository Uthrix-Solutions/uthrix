import React from 'react'

function Newsletter() {
  return (
    <div className='px-4 lg:px-14 max-w-screen-2xl mx-auto bg-neutralSilver py-16'>
       <div>
        <div className='text-center'>
            <h2 className='lg:text-5xl text-3xl text-neutralDGrey font-semibold mb-6 lg:lead-snug'>Join Our Newsletter</h2>
            <p>Subscribe to our newsletter to stay updated with the latest IT trends and offerings.</p>
            <div>
            <button className='bg-naturalPrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-naturalDGrey'>Subscribe</button>
        </div>
        </div>
        

       </div>
      
    </div>
  )
}

export default Newsletter
