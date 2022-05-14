import React from 'react';

const InfoCard = ({img,cardTitle,bgclass}) => {
    return (
        <div className={`card lg:card-side bg-base-100 shadow-xl ${bgclass}`}>
            <figure className='p-3'><img src={img} alt="Album"/></figure>
            <div className="card-body text-white">
                <h2 className="card-titl">{cardTitle}</h2>
                <p>Click the button to listen on Spotiwhy app.</p>
            </div>
        </div>
    );
};

export default InfoCard;