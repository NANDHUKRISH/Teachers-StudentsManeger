import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from './Spinner';
import { FetchUsers } from './FetchUsers';

function StudentsView() {
    let { userId } = useParams();
    const navigate = useNavigate();
    let [Sdata, setSData] = useState({
        loading: true,
        students: [],
        teacher: [],
        filteredStudent: [],
        errorMessage: '',
    });

    useEffect(() => {
        setTimeout(() => {
            const LoadUsers = async () => {
                try {
                    setSData({ ...Sdata, loading: true });
                    let response = await FetchUsers.getStudent(userId);
                    let result = response.data;
                    let response1 = await FetchUsers.getStaffAdvisor(result.TeacherId);
                    let result1 = response1.data;
                    setSData({ ...Sdata, loading: false, students: result, filteredStudent: result, teacher: result1 });
                } catch (err) {
                    setSData({ ...Sdata, loading: false, errormessage: err.message });
                }
            };
            LoadUsers();
        }, 1000);
    }, []);

    let { loading, students, filteredStudent, teacher, errorMessage } = Sdata;
    console.log(teacher);
    return (
        <section
            className="users-list d-flex align-items-center justify-content-around mt-5"
            style={{ paddingTop: '60px' }}
        >
            {loading ? (
                <Spinner />
            ) : (
                Object.keys(filteredStudent).length > 0 && (
                    <div className="container-list ">
                        <div className="row d-flex align-items-center justify-content-center">
                            <div className="col-lg-12 mt-4" id="inner-row-view">
                                <div className="user d-flex align-items-center justify-content-around">
                                    <div className="user-pic-view">
                                        <img src={filteredStudent.avatar} className="img-fluid" alt="user-pic" />
                                    </div>
                                    <div className="user-info-single">
                                        <span>
                                            Name : <b>{filteredStudent.name}</b>
                                        </span>
                                        <span>
                                            Branch : <b>{filteredStudent.Branch}</b>
                                        </span>
                                        <span>
                                            Email : <b>{filteredStudent.email}</b>
                                        </span>
                                        <span>
                                            Staff Advisor: <b>{teacher.name}</b>
                                        </span>
                                        <span>
                                            Mobile : <b>{filteredStudent.mobile}</b>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="Back-button-view">
                            <button onClick={() => navigate(-1)} style={{ fontWeight: 'bold' }}>
                                <i className=" fas fa-fw fa-caret-left "></i>Back
                            </button>
                        </div>
                    </div>
                )
            )}
        </section>
    );
}

export default StudentsView;
