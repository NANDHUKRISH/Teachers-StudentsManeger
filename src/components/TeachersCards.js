import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { Mycontext } from './Context';

function TeachersCards() {
    const navigate = useNavigate();
    const context = useContext(Mycontext);
    return (
        <>
            {context.loading2 ? (
                <div style={{ marginTop: '100px' }}>
                    <Spinner />
                </div>
            ) : (
                <section className="users-list mt-0" style={{ paddingTop: '100px' }}>
                    <div className="d-sm-flex align-items-center justify-content-evenly mb-1" id="card-search">
                        <h1 className="h3  text-gray-800 " style={{ fontWeight: 'bold' }}>
                            Teachers Cards<span>({context.filteredTeachers.length})</span>
                        </h1>
                        <form>
                            <div className="input-group">
                                <input
                                    type="text"
                                    value={context.query}
                                    onChange={context.SearchTData}
                                    placeholder="Search Teacher.."
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
                            {context.filteredTeachers.length === 0 && (
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
                            {context.filteredTeachers.length > 0 &&
                                context.filteredTeachers.map((data) => {
                                    return (
                                        <div className="col-lg-6 mt-4" key={data.id}>
                                            <div className="user d-flex align-items-start">
                                                <div className="user-pic">
                                                    <img src={data.avatar} alt="user-pic" id="user-prifile-pic" />
                                                </div>
                                                <div className="user-info">
                                                    <h4>{data.name}</h4>
                                                    <span>{data.title}</span>
                                                    <b>{data.groupId}</b>
                                                    <p>{data.email}</p>
                                                    <p>
                                                        Ph : <strong>{data.mobile}</strong>
                                                    </p>
                                                    <div className="action">
                                                        <button
                                                            onClick={() => navigate(`/teachersview-user/${data.id}`)}
                                                            className="view-button"
                                                        >
                                                            <i className="fa-solid fa-eye"></i>
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                navigate(`/teachers-lists/edit-teacher/${data.id}`)
                                                            }
                                                            className="Edit-button"
                                                        >
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                        <button
                                                            className="Delete-button"
                                                            onClick={() => context.DeleteTeacher(data.id)}
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

export default TeachersCards;
