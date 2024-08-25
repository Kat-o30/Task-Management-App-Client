import React from 'react'

const AdminDashBoardNav = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between", backgroundColor: "#fff", height: "50px"}}>
      <div className="logo">Logo of the company</div>
      <div className="login">Login as a user</div>
    </div>
  )
}

export default AdminDashBoardNav