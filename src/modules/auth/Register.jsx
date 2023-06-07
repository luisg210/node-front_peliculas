import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import api from "../../api/api";

export const Register = () => {
  const { login } = useContext(AuthContext);

  const [ registerData, setRegisterData ] = useState({
    email: '',
    password: '',
    name: ''
  });

  const onSubmit = (e) => {
    e.preventDefault();

    register();
  };

  const register = async () => {
    try {
      const {data} = await api.post('/users/api/v1/register', registerData);

      if (data.token) {
        console.log(data)
        login(data.token, data.email, data.newUser.role);

      } else {
        alert('Ocurrio un error');
      }

    } catch (error) {
      console.error(error);
    }
  }

  const onChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="container box">
      <div className="row mt-4">
        <div className="col-12">
          <h1>Registro</h1>
        </div>
      </div>

      <form onSubmit={onSubmit}>
      <div className="row mt-4">
          <div className="col-12 form-group">
            <label>Nombre</label>
            <input value={registerData.name} name="name" onChange={onChange} type="text" className="form-control" />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 form-group">
            <label>Correo</label>
            <input value={registerData.email} name="email" onChange={onChange} type="email" className="form-control" />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 form-group">
            <label>Contraseña</label>
            <input value={registerData.password} name="password" onChange={onChange} type="password" className="form-control" />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 form-group">
            <input type="submit" className="btn btn-success" value="Registrar" />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 form-group">
            <Link to="/" className="btn btn-primary" >Ya tengo cuenta</Link>
          </div>
        </div>
      </form>
    </div>
  );
};
