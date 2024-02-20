import React, { useEffect, useState } from 'react';
import { Mycontext } from './Context';
import { FetchUsers } from './FetchUsers';

function Provider({ children }) {
    /* Student Details */

    let [Sdata, setSData] = useState({
        loading: true,
        students: [],
        filteredStudents: [],
        errorMessage: '',
    });

    useEffect(() => {
        setTimeout(() => {
            const LoadUsers = async () => {
                try {
                    setSData({ ...Sdata, loading: true });
                    let response = await FetchUsers.getAllStudent();
                    let result = response.data;
                    setSData({ ...Sdata, loading: false, students: result, filteredStudents: result });
                } catch (err) {
                    setSData({ ...Sdata, loading: false, errormessage: err.message });
                }
            };
            LoadUsers();
        }, 1000);
    }, []);

    /* Teacher Details */

    let [Tdata, setTData] = useState({
        loading2: true,
        teachers: [],
        filteredTeachers: [],
        errorMessage2: '',
    });

    useEffect(() => {
        setTimeout(() => {
            const LoadUsers = async () => {
                try {
                    setTData({ ...Tdata, loading2: true });
                    let response = await FetchUsers.getAllTeachers();
                    let result = response.data;
                    setTData({ ...Tdata, loading2: false, teachers: result, filteredTeachers: result });
                } catch (err) {
                    setTData({ ...Tdata, loading2: false, errormessage2: err.message });
                }
            };
            LoadUsers();
        }, 500);
    }, []);

    let { loading, students, filteredStudents, errorMessage } = Sdata;
    let { loading2, teachers, filteredTeachers, errorMessage2 } = Tdata;

    /* Delete Student */
    const DeleteStudent = async (id) => {
        let response = await FetchUsers.DeleteStudent(id);
        if (response) {
            try {
                setSData({ ...Sdata, loading: true });
                let response = await FetchUsers.getAllStudent();
                let result = response.data;
                setSData({ ...Sdata, loading: false, students: result, filteredStudents: result });
            } catch (err) {
                setSData({ ...Sdata, loading: false, errormessage: err.message });
            }
        }
    };

    /* Delete TEacher */
    const DeleteTeacher = async (id) => {
        let response = await FetchUsers.DeleteTeacher(id);
        if (response) {
            try {
                setTData({ ...Tdata, loading2: true });
                let response = await FetchUsers.getAllTeachers();
                let result = response.data;
                setTData({ ...Tdata, loading2: false, teachers: result, filteredTeachers: result });
            } catch (err) {
                setTData({ ...Tdata, loading2: false, errormessage2: err.message });
            }
        }
    };

    /* Filter Details */

    let [query, setQuery] = useState('');

    const SearchDashData = (e) => {
        setQuery(e.target.value);
        let theteacher = teachers.filter((te) => {
            return te.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        let thestudent = students.filter((st) => {
            return st.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setTData({ ...Tdata, filteredTeachers: theteacher });
        setSData({ ...Sdata, filteredStudents: thestudent });
    };

    /* Filter Student */

    const SearchSData = (e) => {
        setQuery(e.target.value);
        let theStudent = students.filter((st) => {
            return st.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setSData({ ...Sdata, filteredStudents: theStudent });
    };

    /* Techers Filter */

    const SearchTData = (e) => {
        setQuery(e.target.value);
        let theteacher = teachers.filter((te) => {
            return te.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setTData({ ...Tdata, filteredTeachers: theteacher });
    };

    return (
        <Mycontext.Provider
            value={{
                Sdata,
                Tdata,
                SearchTData,
                SearchSData,
                SearchDashData,
                query,
                DeleteTeacher,
                DeleteStudent,
                loading,
                students,
                filteredStudents,
                errorMessage,
                loading2,
                teachers,
                filteredTeachers,
                errorMessage2,
                setTData,
                setSData,
            }}
        >
            {children}
        </Mycontext.Provider>
    );
}

export default Provider;
