import React from 'react'
import Button from './Button';

const Discuss = () => {
    return (
        <>
            <div className="container w-full md:w-1/2 lg:w-2/5 px-4 py-9 my-6 flex flex-col items-center justify-between">
                <div className="discuss-heading text-3xl font-bold my-2">
                    <h2 className='text-center'>Do you have Project Idia? Let's discuss your project!</h2>
                </div>
                <div className='discuss_para text-sm my-2 text-center'>
                    <p>There are many variations of passages of Lorem Ipsum available,
                        but the majority have suffered alteration.</p>
                </div>
                <div className="work_together_btn my-2">
                    <Button Button_text={'Lets work together'} />

                </div>
            </div>
        </>
    )
}

export default Discuss;