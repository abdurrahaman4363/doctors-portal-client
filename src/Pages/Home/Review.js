import React from 'react';

const Review = ({ review }) => {
    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl">
            <div className="card-body">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut accusamus, labore unde qui cumque.</p>
            </div>
            <div className='flex items-center m-10'>
                <div className="avatar">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 mr-5 ring-offset-2">
                        <img src={review.img} alt="" />
                    </div>
                </div>
                <div>
                    <h4 className='text-xl'>{review.name}</h4>
                    <p>{review.location}</p>
                </div>
            </div>
        </div>
    );
};

export default Review;