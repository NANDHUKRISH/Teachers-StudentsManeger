import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FetchUsers } from './FetchUsers';
import { Mycontext } from './Context';
function AddTeacher() {
    const navigate = useNavigate();
    const context = useContext(Mycontext);
    const { id } = useParams();
    let [FormValue, setFormValue] = useState({
        user: {
            name: '',
            avatar: '',
            mobile: '',
            title: '',
            groupId: '',
            email: '',
        },
        errorMessage: '',
    });

    let { user, errorMessage } = FormValue;

    useEffect(() => {
        const loadUser = async () => {
            if (id) {
                let response = await FetchUsers.getTeacher(id);
                let result = response.data;
                setFormValue({ ...FormValue, user: result });
            }
        };
        loadUser();
    }, [id]);
    
    const onInputChange = (e) => {
        setFormValue({ user: { ...FormValue.user, [e.target.name]: e.target.value } });
    };

    const FormTSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            try {
                let response = await FetchUsers.EditTeacher(user, id);
                if (response) {
                    try {
                        context.setTData({ ...context.Tdata, loading2: true });
                        let response = await FetchUsers.getAllTeachers();
                        let result = response.data;
                        context.setTData({ ...context.Tdata, loading2: false, teachers: result, filteredTeachers: result });
                    } catch (err) {
                        context.setTData({ ...context.Tdata, loading2: false, errormessage2: err.message });
                    }
                    navigate('/teachers-cards');
                }
            } catch (err) {
                navigate('/teachers-lists/add-teacher');
            }
        } else {
            try {
                let response = await FetchUsers.CreateTeacher(user);
                if (response) {
                    try {
                        context.setTData({ ...context.Tdata, loading2: true });
                        let response = await FetchUsers.getAllTeachers();
                        let result = response.data;
                        context.setTData({ ...context.Tdata, loading2: false, teachers: result, filteredTeachers: result });
                    } catch (err) {
                        context.setTData({ ...context.Tdata, loading2: false, errormessage2: err.message });
                    }
                    navigate('/teachers-cards');
                }
            } catch (err) {
                setFormValue({ ...FormValue, errormessage: err.message });
                navigate('/teachers-lists/add-teacher');
            }
        }
    };

    return (
        <div className="container-fluid">
            {/* <!-- Page Heading --> */}
            <div className="d-sm-flex align-items-center justify-content-evenly mb-4">
                <h1 className="h3 mb-2 text-gray-800 " style={{ fontWeight: 'bold' }}>
                    <i className="fas fa-user-plus fa-sm text-black-50 mr-3"></i>
                    {id ? 'EDIT' : 'ADD'} TEACHER
                </h1>
                <button
                    onClick={() => navigate(-1)}
                    className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm font-weight-bolder p-2"
                >
                    <i className=" fas fa-fw fa-caret-left "></i>Back
                </button>
            </div>

            <div className="row d-flex align-items-center justify-content-center ">
                <div className="col-xl-8 col-lg-10 ">
                    <div className="card shadow mb-4">
                        {/*  <!-- Card Body --> */}
                        <div className="card-body">
                            <form action="#" class="formbox" onSubmit={FormTSubmit}>
                                <div class="user-details">
                                    <div class="input-box">
                                        <label for="name" class="details">
                                            NAME
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={user.name}
                                            onChange={onInputChange}
                                            placeholder="Enter your Full Name"
                                            autocomplete="off"
                                            required
                                        />
                                    </div>
                                    <div class="input-box">
                                        <label for="avatar" class="details">
                                            IMAGE
                                        </label>
                                        <input
                                            type="url"
                                            name="avatar"
                                            id="avatar"
                                            value={user.avatar}
                                            onChange={onInputChange}
                                            placeholder="Enter your photo url"
                                            autocomplete="off"
                                            required
                                        />
                                    </div>
                                    <div class="input-box">
                                        <label for="groupId" class="details">
                                            DESIGNATION
                                        </label>
                                        <input
                                            type="text"
                                            name="groupId"
                                            value={user.groupId}
                                            onChange={onInputChange}
                                            placeholder="Enter Designation"
                                            id="groupId"
                                            autocomplete="off"
                                            required
                                        />
                                    </div>
                                    <div class="input-box">
                                        <label for="title" class="details">
                                            DEPARTMENT
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={user.title}
                                            onChange={onInputChange}
                                            placeholder="Enter Department"
                                            id="title"
                                            autocomplete="off"
                                            required
                                        />
                                    </div>
                                    <div class="input-box">
                                        <label for="email" class="details">
                                            EMAIL-ID
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            onChange={onInputChange}
                                            placeholder="Enter your Email-id"
                                            id="email"
                                            row="10"
                                            col="4"
                                            autocomplete="off"
                                            required
                                        />
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="mobile" className="details">
                                            PHONE NUMBER
                                        </label>
                                        <input
                                            type="text"
                                            name="mobile"
                                            value={user.mobile}
                                            onChange={onInputChange}
                                            placeholder="Enter contact number"
                                            id="mobile"
                                            required
                                        />
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
    );
}

export default AddTeacher;
