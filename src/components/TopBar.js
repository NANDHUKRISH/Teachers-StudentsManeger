import React from 'react'

function TopBar({changeStyle}) {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

        {/* <!-- Sidebar Toggle (Topbar) --> */}
        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={changeStyle}>
            <i className="fa fa-bars"></i>
        </button>

       {/*  <!-- Topbar Search --> */}
        <div id="topbar-heading">
        <i className="fa-solid fa-users mr-2" style={{color:"#fd7e14"}}></i>
        <b>STUDENTS & TEACHERS <span style={{color:"#fd7e14",margin:"auto"}}>MANAGER</span></b>
        </div>
         
       {/*  <!-- Topbar Navbar --> */}
       

    </nav>
  )
}

export default TopBar