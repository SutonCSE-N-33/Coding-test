import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
const Problem1 = () => {
    const { register, handleSubmit, formState: { errors },reset } = useForm();
    const [show, setShow] = useState('all');
    const [formData,setFormData] = useState([])
    const handleClick = (val) =>{
        setShow(val);
    }
    const getUserData = () =>{
        const storedUserData = JSON.parse(localStorage.getItem("userData"));
        setFormData(storedUserData)
    }
    useEffect(()=>{
        getUserData();
    })
    const onSubmit = (data) => {
        const userData = {
            name:data.name,
            status:data.status
        }
        formData.push(userData)
        setFormData(formData)
        localStorage.setItem('userData',JSON.stringify(formData))
        getUserData();
        reset();
    }

    const activeStatus = formData.filter((user) => user.status.toLowerCase() === 'active')
    const completedStatus = formData.filter((user) => user.status.toLowerCase() === 'completed')
    
    let status;
    if(show === 'all'){
        status = formData.sort((a, b) => {
            if (a.status.toLowerCase() < b.status.toLowerCase()) {
                return -1;
              }
              if (a.status.toLowerCase() > b.status.toLowerCase()) {
                return 1;
              }
              return 0;
        });
    }else if(show === 'active'){
        status = activeStatus;
    }else if(show === 'completed'){
        status = completedStatus;
    }

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form onSubmit={handleSubmit(onSubmit)} className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input {...register("name", {required: true})} type="text" className="form-control" placeholder="Name"/>
                        </div>
                        <div className="col-auto">
                            <input {...register("status", {required: true})} type="text" className="form-control" placeholder="Status"/>
                        </div>
                        <div className="col-auto">
                            <input type="submit" value="Submit" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='all' && 'active'}`} type="button" onClick={()=>handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show==='active' && 'active'}`} type="button" onClick={()=>handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='completed' && 'active'}`} type="button" onClick={()=>handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            status.map((user) => (
                            <tr>
                            <td scope="col">{user.name}</td>
                            <td scope="col">{user.status}</td>
                        </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;