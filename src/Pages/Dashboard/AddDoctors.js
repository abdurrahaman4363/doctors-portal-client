import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const AddDoctors = () => {
    const { register, formState: { errors }, handleSubmit,reset } = useForm();

    const { data: services, isLoading } = useQuery('services', () => fetch('http://localhost:5000/service').then(res => res.json()))

const imageStorageKey = '80d2de6e3f58e6b14d7430cf1f478fc0'
      /**
       * 3 ways to store images
       * 1. third party storage // Free open public storage is ok for pratice project
       * 2.Your  own storage in your own server (file system)
       * 3. Database: Mongodb
       * 
       * YUP: to validate file : Search  : yup file validation for react hook form 
      */

    const onSubmit = async (data) => {
        // console.log('data', data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`
        fetch(url, {
            method: 'POST',
            body:formData
        })
        .then(res => res.json())
        .then(result => {
            if(result.success){
                const img = result.data.url;
                const doctor = {
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    img: img
                }

                // send to your database
                fetch("http://localhost:5000/doctor",{
                    method:'POST',
                    headers:{
                        'content-type':'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body:JSON.stringify(doctor)
                } )
                .then(res => res.json())
                .then(inserted => {
                    console.log('doctor',inserted);
                    if(inserted.insertedId){
                      toast.success('Doctor added successfully')
                      reset();
                    }
                    else{
                        toast.error('Failed to add the doctor')
                    }

                })
            }
           console.log('imgbb',result)
        })
    };

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className="text-2xl">Add a new doctor</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* name field */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text"
                        placeholder="Your Name"
                        className="input input-bordered w-full max-w-xs"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }

                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}


                    </label>
                </div>

                {/* email field */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email"
                        placeholder="Your Eamil"
                        className="input input-bordered w-full max-w-xs"
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is Required'
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'Provide a valid Eamil'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}

                    </label>
                </div>

                {/* password field */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">specialty</span>
                    </label>

                    <select {...register('specialty')} class="select input-bordered w-full max-w-xs">
                        {
                            services.map(service =><option
                            key={service._id}
                            value={service.name}
                            >{service.name}</option> )
                        }
                    </select>
                </div>
                {/* img for doctors */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file"
                       
                        className="input input-bordered w-full max-w-xs"
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'Image is Required'
                            }

                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}


                    </label>
                </div>

                <input className='btn w-full max-w-xs' type="submit" value='ADD' />
            </form>
        </div>
    );
};

export default AddDoctors;