/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
    name: '',
    email: '',
    address: '',
    age: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      window.alert('Las contraseñas no coinciden');
    } else {
      // configurar para enviar datos del registro, solo email y usuario. 
      window.alert('Registro exitoso');
    }
  };

  return (
    <div className="container my-5">
      <div className="jumbotron">
        <form className="form" action="/register" onSubmit={handleSubmit} method="post" role="form" autoComplete="off">
          <h1>REGISTER</h1>
          <br />

          <div className="form-group">
            <input
              id="username"
              name="username"
              placeholder="Create username"
              className="form-control"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              id="password"
              name="password"
              placeholder="Set password"
              className="form-control"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              id="password2"
              name="password2"
              placeholder="Confirm password"
              className="form-control"
              type="password"
              value={formData.password2}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              id="name"
              name="name"
              placeholder="Your first name"
              className="form-control"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              id="email"
              name="email"
              placeholder="Your email"
              className="form-control"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              id="address"
              name="address"
              placeholder="Your address"
              className="form-control"
              type="text"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              id="age"
              name="age"
              placeholder="Your age"
              className="form-control"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input className="btn btn-success my-3" type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
