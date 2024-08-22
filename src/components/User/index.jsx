import React, { useState } from 'react';
import axios from "axios";
import { data } from "../../assets/dummy";
import '../../App.css';

const User = () => {
  return (
    <div className='form--user'>
      <form action="" className='form'>
        <input type="text" name="" placeholder="ID" />
        <input type="text" name="" placeholder="Name" />
        <input type="text" name="" placeholder="Username" />
        <input type="text" name="" placeholder="Email" />
        <input type="text" name="" placeholder="Phone" />
        <input type="text" name="" placeholder="Website" />
        <button type="submit">Submit</button>
      </form>
      <div className='user--outer'>
        <table className='user-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.website}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default User;