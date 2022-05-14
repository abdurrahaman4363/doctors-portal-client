import React from 'react';
import doctor from '../../assets/images/doctor.png'
import appointment from '../../assets/images/appointment.png'
import PrimaryButton from '../Shared/PrimaryButton';

const MakeAppointment = () => {
    return (
        <section style={{
            background:`url(${appointment})`
        }} className='flex justify-center items-center'>
            <div className='flex-1 hidden lg:block'>
                <img className='mt-[-150px]' src={doctor} alt="" />
            </div>
            <div className='flex-1 text-white'>
                <h3 className='text-xl text-primary font-bold'>Appointment</h3>
                <h2 className='text-3xl'>Make an Appointment Today</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae omnis soluta distinctio vero explicabo cumque tempora neque voluptate. Dolore aut ut numquam cum blanditiis. Neque aspernatur fugiat nihil praesentium eius?
                </p>
                <PrimaryButton>Make Started</PrimaryButton>
            </div>
        </section>
    );
};

export default MakeAppointment;