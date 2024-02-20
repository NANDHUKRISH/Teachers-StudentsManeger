import React from 'react'
import {Link} from 'react-router-dom';
function Sidebar({style,changeStyle}) {
  return (
<ul className={style} id="accordionSidebar" style={{position:"sticky",top:0}}>

{/* <!-- Sidebar - Brand --> */}
<a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
    <div className="sidebar-brand-icon rotate-n-15">
        <i className="fas fa-laugh-wink"></i>
    </div>
    <div className="sidebar-brand-text mx-3">Admin</div>
</a>

{/* <!-- Divider --> */}
<hr className="sidebar-divider my-0"/>

{/* <!-- Nav Item - Dashboard --> */}
<li className="nav-item active">
    <Link to="/dashboard">
    <div className="nav-link">
        <i className="fas fa-fw fa-house"></i>
        <span>Dashboard</span>
    </div>
    </Link>
</li>

{/* <!-- Divider --> */}
<hr className="sidebar-divider"/>

{/* <!-- Heading --> */}
<div className="sidebar-heading">
    Students
</div>

{/* <!-- Nav Item - Pages Collapse Menu --> */}
<li className="nav-item active">
    <Link to="students-lists">
    <div className="nav-link collapsed" data-toggle="collapse" 
        aria-expanded="true" aria-controls="collapseTwo">
        <i className="fas fa-fw fa-table-list"></i>
        <span>Students List</span>
    </div>
    </Link>    
</li>

{/* <!-- Nav Item - Utilities Collapse Menu --> */}
<li className="nav-item active">
    <Link to="students-cards">
    <div className="nav-link collapsed"  data-toggle="collapse" data-target="#collapseUtilities"
        aria-expanded="true" aria-controls="collapseUtilities">
        <i className="fas fa-fw fa-folder"></i>
        <span>Student Details</span>
    </div>
    </Link>
</li>

{/* Add Student */}
<li className="nav-item active">
    <Link to="/students-lists/add-student">
    <div className="nav-link collapsed"  data-toggle="collapse" data-target="#collapseUtilities"
        aria-expanded="true" aria-controls="collapseUtilities">
        <i className=" fas fa-fw fa-user-plus mr-1"></i>
        <span>Add Student</span>
    </div>
    </Link>
</li>

{/* <!-- Divider --> */}
<hr className="sidebar-divider"/>

{/* <!-- Heading --> */}
<div className="sidebar-heading">
    Teachers
</div>

{/* <!-- Nav Item - Pages Collapse Menu --> */}
<li className="nav-item active">
    <Link to="teachers-lists">
    <div className="nav-link collapsed"  data-toggle="collapse" data-target="#collapseTwo"
        aria-expanded="true" aria-controls="collapseTwo">
        <i className="fas fa-fw fa-table-list"></i>
        <span>Teachers List</span>
    </div>
    </Link>
</li>

{/* <!-- Nav Item - Utilities Collapse Menu --> */}
<li className="nav-item active">
    <Link to="teachers-cards">
    <div className="nav-link collapsed"  data-toggle="collapse" data-target="#collapseUtilities"
        aria-expanded="true" aria-controls="collapseUtilities">
        <i className="fas fa-fw fa-folder"></i>
        <span>Teacher Details</span>
    </div>
    </Link>
</li>

{/* Add Teacher */}
<li className="nav-item active">
    <Link to="/teachers-lists/add-teacher">
    <div className="nav-link collapsed"  data-toggle="collapse" data-target="#collapseUtilities"
        aria-expanded="true" aria-controls="collapseUtilities">
        <i className=" fas fa-fw fa-user-plus mr-1"></i>
        <span>Add Teacher</span>
    </div>
    </Link>
</li>

{/* <!-- Divider --> */}
<hr className="sidebar-divider d-none d-md-block"/>

{/* <!-- Sidebar Toggler (Sidebar) --> */}
<div className="text-center d-none d-md-inline">
    <button className="rounded-circle border-0" onClick={changeStyle} id="sidebarToggle"></button>
</div>



</ul>
  )
}

export default Sidebar