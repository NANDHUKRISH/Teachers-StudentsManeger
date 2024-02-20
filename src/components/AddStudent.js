import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import { FetchUsers } from './FetchUsers';
import { Mycontext } from './Context';
function AddStudent() {

    let navigate = useNavigate();
    const context=useContext(Mycontext);
    const {id}=useParams();
    let [SFormValue,setSFormValue]=useState({
        user:{
            name:"",
            avatar:"",
            mobile:"",
            title:"",
            Branch:"",
            TeacherId:"",
            email:""
        },
        students:[],
        teachers:[],
        errormessage:""          
    });

    let {user,teachers}=SFormValue;

    useEffect(()=>{
        const loader=async ()=>{
            if(id){
                let response=await FetchUsers.getStudent(id);
                let newresult=response.data
                let response1=await FetchUsers.getAllTeachers();
                let result1=response1.data;
                setSFormValue({...SFormValue,user:newresult,teachers:result1});
            }else{
                try{
                    setSFormValue({...SFormValue,loading:true,user:{}});
                    let response=await FetchUsers.getAllTeachers();
                    let result=response.data;
                    setSFormValue({...SFormValue,
                      teachers:result
                  });
                 }
                 catch (error){
                  setSFormValue({...SFormValue,
                    loading:false,
                    errormessage:error.message
                  });
                 }
            }
        }  
        loader();
 },[]);
 

    const onInputSChange=(e)=>{
        setSFormValue({
            ...SFormValue, user:{...SFormValue.user,[e.target.name]:e.target.value}
        });
    }

 const SFormSubmit= async (e)=>{
    e.preventDefault();
    if(id){
        try{
            let response= await FetchUsers.EditStudent(user,id);
                if(response){
                    try{
                        context.setSData({...context.Sdata, loading:true});
                        let response = await FetchUsers.getAllStudent();
                        let result=response.data;
                        context.setSData({...context.Sdata, loading:false,students:result,filteredStudents:result});
                    }catch(err){
                        context.setSData({ ...context.Sdata, loading: false, errormessage: err.message });
                    }
                  navigate("/students-cards");
                }
        }catch(err){
            setSFormValue({...SFormValue,
             errormessage:err.message
            });
            navigate("/students-lists/add-student");
        }
    }else{
        try{
            let response= await FetchUsers.CreateStudent(user);
                if(response){
                    try{
                        context.setSData({...context.Sdata, loading:true});
                        let response = await FetchUsers.getAllStudent();
                        let result=response.data;
                        context.setSData({...context.Sdata, loading:false,students:result,filteredStudents:result});
                    }catch(err){
                        context.setSData({ ...context.Sdata, loading: false, errormessage: err.message });
                    }
                  navigate("/students-cards");
                }
        }catch(err){
            setSFormValue({...SFormValue,
             errormessage:err.message
            });
            navigate("/students-lists/add-student");
        }
    }
  }

  return (
    <div className="container-fluid">

    {/* <!-- Page Heading --> */}
    <div className="d-sm-flex align-items-center justify-content-evenly mb-4">
        <h1 className="h3 mb-2 text-gray-800 " style={{fontWeight:"bold" }}>
        <i className="fas fa-user-plus fa-sm text-black-50 mr-3"></i>{id?"EDIT":"ADD"} STUDENT</h1>
        <button onClick={()=>navigate(-1)} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm font-weight-bolder p-2">
            <i className=" fas fa-fw fa-caret-left "></i>Back
        </button>
    </div>

    <div className="row d-flex align-items-center justify-content-center ">
    <div className="col-xl-8 col-lg-10 ">
        <div className="card shadow mb-4">

           {/*  <!-- Card Body --> */}
            <div className="card-body">
        <form action="#" class="formbox" onSubmit={SFormSubmit}>
            <div class="user-details">
                <div class="input-box">
                    <label for="name" class="details">NAME</label>
                    <input type="text" name="name" id="name"  value={user.name} onChange={onInputSChange} placeholder="Enter your Full Name" autocomplete="off" required/>
                </div>
                <div class="input-box">
                    <label for="avatar" class="details">IMAGE</label>
                    <input type="url" name="avatar" id="avatar" value={user.avatar} onChange={onInputSChange}  placeholder="Enter your photo url" autocomplete="off" required/>
                </div>
                <div class="input-box">
                    <label for="Branch" class="details">BRANCH</label>
                    <input type="text" name="Branch" value={user.Branch} onChange={onInputSChange} placeholder="Enter Branch" id="Branch" autocomplete="off" required/>
                </div>
                <div class="input-box">
                    <label for="email" class="details" >EMAIL-ID</label>
                    <input type="email" name="email" value={user.email} onChange={onInputSChange} placeholder="Enter your Email-id" id="email" row="10" col="4" autocomplete="off" required/>
                </div>
                <div class="input-box">
                    <label for="TeacherId" class="details" >STAFF ADVISOR</label>
                    <select name="TeacherId" id="TeacherId" value={user.TeacherId} onChange={onInputSChange} required>
                        <option value="">Select Staff Advisor</option>
                       {
                       teachers.length>0 && teachers.map(teacher =>{
                            return (
                                <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                            )
                        })
                       }
                    </select>
                </div>
                <div className="input-box input-box-add">
                    <label htmlFor="mobile" className="details">PHONE NUMBER</label>
                    <input type="number" name="mobile" value={user.mobile} onChange={onInputSChange} placeholder="Enter contact number" id="mobile" required/>
                </div>
            </div>
            <div class="button">
                <button class="submitbutton">SUBMIT</button>
            </div>
        </form>
            </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default AddStudent