import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { Mycontext } from './Context';
function StudentsList() {
    const navigate = useNavigate();
    const context = useContext(Mycontext);

    return (
        <div className="container-fluid">
            {/* <!-- Page Heading --> */}
            <div className="d-sm-flex align-items-center justify-content-evenly mb-4" id="card-search">
                <h1 className="h3 mb-2 text-gray-800 " style={{ fontWeight: 'bold' }}>
                    Students List
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

            {/* <!-- Students List --> */}

            <div className="row d-flex align-items-center justify-content-center ">
                {/* <!-- Students List --> */}
                <div className="col-xl-10 ">
                    <div className="card shadow mb-4">
                        {/*    <!-- Card Header - Dropdown --> */}
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-center">
                            <h5 className="m-0 font-weight-bolder text-primary">
                                STUDENTS LIST<span>({context.filteredStudents.length})</span>
                            </h5>
                        </div>
                        {/*  <!-- Card Body --> */}
                        {context.loading ? (
                            <Spinner />
                        ) : context.filteredStudents.length === 0 ? (
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
                        ) : (
                            <div className="card-body">
                                <main class="table">
                                    <section class="table-body">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>#Id</th>
                                                    <th>Name</th>
                                                    <th>Branch</th>
                                                    <th>EmailId</th>
                                                    <th>Staff-Teacher</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody id="table-body" className="table-body-details">
                                                {context.filteredStudents.length > 0 &&
                                                    context.filteredStudents.map((data, index) => {
                                                        let ft = context.filteredTeachers.filter(
                                                            (teacher) => teacher.id === data.TeacherId
                                                        );
                                                        return (
                                                            <tr className="tablerow" key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{data.name}</td>
                                                                <td>{data.Branch}</td>
                                                                <td>{data.email}</td>
                                                                {ft.length > 0 ? (
                                                                    <td>{ft[0].name}</td>
                                                                ) : (
                                                                    <td style={{ color: 'red' }}>Not Assigned</td>
                                                                )}
                                                                <td className="action-tabledata">
                                                                    <div className="action-buttons">
                                                                        <button
                                                                            onClick={() =>
                                                                                navigate(`/studentview-user/${data.id}`)
                                                                            }
                                                                            className="view-button"
                                                                        >
                                                                            <i className="fa-solid fa-eye"></i>
                                                                        </button>
                                                                        <button
                                                                            onClick={() =>
                                                                                navigate(
                                                                                    `/students-lists/edit-student/${data.id}`
                                                                                )
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
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                            </tbody>
                                        </table>
                                    </section>
                                </main>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentsList;
