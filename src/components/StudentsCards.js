import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { Mycontext } from './Context';

function StudentsCards() {
    const navigate = useNavigate();
    const context = useContext(Mycontext);
    return (
        <>
            {context.loading ? (
                <div style={{ marginTop: '100px' }}>
                    <Spinner />
                </div>
            ) : (
                <section className="users-list mt-0" style={{ paddingTop: '100px' }}>
                    <div className="d-sm-flex align-items-center justify-content-evenly mb-1" id="card-search">
                        <h1 className="h3  text-gray-800 " style={{ fontWeight: 'bold' }}>
                            Students Cards<span>({context.filteredStudents.length})</span>
                        </h1>
                        <form>
                            <div className="input-group">
                                <input
                                    type="text"
                                    value={context.query}
                                    onChange={context.SearchSData}
                                    placeholder="Search Student.."
                                    id="home-search"
                                />
                                <div className="input-group-append">
                                    <button
                                        type="button"
                                        style={{ backgroundColor: 'rgb(255, 102, 71)', color: '#fff' }}
                                        id="home-search-button"
                                    >
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="container" style={{ paddingTop: '0px' }}>
                        <div className="row">
                            {context.filteredStudents.length === 0 && (
                                <div
                                    className="col-lg-12 mt-4"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: '25px',
                                        fontWeight: '900',
                                        color: 'tomato',
                                        marginTop: '20px',
                                    }}
                                >
                                    No Data Found
                                </div>
                            )}
                            {context.filteredStudents.length > 0 &&
                                context.filteredStudents.map((data) => {
                                    let ft = context.filteredTeachers.filter((teacher) => teacher.id === data.TeacherId);
                                    return (
                                        <div className="col-lg-6 mt-4" key={data.id}>
                                            <div className="user d-flex align-items-start">
                                                <div className="user-pic">
                                                    <img src={data.avatar} alt="user-pic" id="user-prifile-pic" />
                                                </div>
                                                <div className="user-info">
                                                    <h4>{data.name}</h4>
                                                    <span>{data.Branch}</span>
                                                    {ft.length > 0 ? (
                                                        <b>T-{ft[0].name}</b>
                                                    ) : (
                                                        <b style={{ color: 'red' }}>T-Not Assigned</b>
                                                    )}
                                                    <p>{data.email}</p>
                                                    <p>
                                                        Ph : <strong>{data.mobile}</strong>
                                                    </p>
                                                    <div className="action">
                                                        <button
                                                            onClick={() => navigate(`/studentview-user/${data.id}`)}
                                                            className="view-button"
                                                        >
                                                            <i className="fa-solid fa-eye"></i>
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                navigate(`/students-lists/edit-student/${data.id}`)
                                                            }
                                                            className="Edit-button"
                                                        >
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                        <button
                                                            className="Delete-button"
                                                            onClick={() => context.DeleteStudent(data.id)}
                                                        >
                                                            <i className="fa-solid fa-trash-can"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

export default StudentsCards;
