import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { AuthContext } from "../../context/AuthProvider";

export const Login = () => {
  const { login: onLogin } = useContext(AuthContext);

  const [ loginData, setLoginData ] = useState({
    email: '',
    password: ''
  });

  const onSubmit = (e) => {
    e.preventDefault();

    login();
  };

  const login = async () => {
    try {
      const {data} = await api.post('/users/api/v1/login', loginData);
      
      if (data.token) {
        onLogin(data.token, data.email, data.user.role);

      } else {
        alert('Ocurrio un error');
      } 

    } catch (error) {
      console.error(error);
    }
  }

  const onChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="container box">
      <div className="row mt-4">
        <div className="col-12">
          <h1>Login</h1>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="row mt-4">
          <div className="col-12 form-group">
            <label>Correo</label>
            <input value={loginData.email} name="email" onChange={onChange} type="email" className="form-control" />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 form-group">
            <label>Contraseña</label>
            <input value={loginData.password} name="password" onChange={onChange} type="password" className="form-control" />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 form-group">
            <input type="submit" className="btn btn-success" value="Login" />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 form-group">
            <Link to="/register" className="btn btn-primary" >No tengo cuenta</Link>
          </div>
        </div>
      </form>
    </div>
  );
};
