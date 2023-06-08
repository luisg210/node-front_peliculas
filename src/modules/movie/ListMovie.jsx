import { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import { AuthContext } from "../../context/AuthProvider";

export const ListMovie = () => {
  const [movies, setMovies] = useState([]);
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    stock: 0,
    rental_price: "",
    sale_price: "",
    image: File,
    img64: "",
  });
  const [likes, setLikes] = useState([]);
  const { token, role, email } = useContext(AuthContext);

  const getAllMovies = async () => {
    try {
      const { rows } = (await api.get("movies/api/v1/")).data;

      if (token.length > 0) {
        const likesByUser = (await api.get(`users/api/v1/likes/${email}`)).data;

        setLikes(likesByUser);
        console.log(likesByUser);
        likes.map((l) => {
          rows.map((m) => {
            if (l.id_movie == m.id) {
              m.isLiked = true;
            }
          });
        });
      }

      setMovies(rows);
      console.log(rows);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleLike = async (isLiked, id_movie) => {
    try {
      if (isLiked == undefined) {
        await api.post("movies/api/v1/like", { id_movie, email });
      } else {
        await api.delete(`movies/api/v1/deslike/${id_movie}`);
      }

      await getAllMovies();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const res = confirm("Estas segurp de eliminar esta pelicula?");

      if (res) {
        const status = (await api.delete(`/movies/api/v1/${id}`)).status;
        getAllMovies();

        if (status == 204) alert("Eliminado!");
        else alert("Error al eliminar");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveMovie = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", movieData.title);
    formData.append("description", movieData.description);
    formData.append("stock", movieData.stock);
    formData.append("rental_price", movieData.rental_price);
    formData.append("sale_price", movieData.sale_price);
    formData.append("image", movieData.image);

    try {
      const status = (await api.post("movies/api/v1/", formData)).status;

      if (status == 201) {
        alert("Creado");

        cleanModal();
        getAllMovies();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.value,
    });
  };

  const cleanModal = () => {
    setMovieData({
      title: "",
      description: "",
      stock: 0,
      rental_price: "",
      sale_price: "",
      image: File,
    });
  };

  const fileHandle = (e) => {
    setMovieData({
      ...movieData,
      image: e.target.files[0],
    });

    console.log(e.target.files[0]);
  };

  const movieDetail = async (id) => {
    try {
      const { data } = await api.get(`movies/api/v1/${id}`);

      if (data) {
        setMovieData({
          title: data.title,
          description: data.description,
          stock: data.stock,
          rental_price: data.rental_price,
          sale_price: data.sale_price,
          img64: data.image,
        });
        console.log(movieData);
      } else alert("Ha ocurrido un error");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-12">
          <h1>Peliculas</h1>
        </div>
      </div>

      {role == "admin" && (
        <div className="row mt-4">
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Agregar
            </button>
          </div>
        </div>
      )}

      <div className="row mt-4">
        {movies.map((m) => {
          return (
            <div className="col-lg-3 col-md-12 p-1 mt-1" key={m.id}>
              <div className="card">
                <img
                  src={`data:image/jpeg;base64,${m.image}`}
                  className="justify-center img-card"
                  alt={m.title}
                  title={m.title}
                />

                <div className="card-body">
                  <h5 className="card-title">{m.title}</h5>
                  <p className="card-text">
                    {m.description.length < 20 ? m.description : m.description.substring(0, 20)}...
                  </p>

                  <p className="card-text">
                    Alquiler: {m.rental_price} - Venta: {m.sale_price}
                  </p>

                  {token.length > 0 && (
                    <>
                      <div className="action-buttons">
                        <div>
                          <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#detailModal"
                            onClick={() => movieDetail(m.id)}
                          >
                            Detalle
                          </button>
                        </div>

                        <div>
                          <button className="mt-1">Alquilar</button>
                        </div>

                        <div>
                          <button className="mt-1">Comprar</button>
                        </div>
                      </div>

                      <div>
                        <button
                          className="mt-1"
                          onClick={() => toggleLike(m.isLiked, m.id)}
                        >
                          {m.isLiked ? "Liked" : "Like"}
                        </button>
                      </div>
                    </>
                  )}

                  {role === "admin" && (
                    <>
                      <button
                        className="mt-1"
                        onClick={() => deleteMovie(m.id)}
                      >
                        Eliminar
                      </button>
                      <button className="mt-1">Actualizar</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Agregar Pelicula */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form
          className="modal-dialog"
          onSubmit={saveMovie}
          encType="multipart/form-data"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Pelicula
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row mt-4">
                <div className="col-lg-6 col-md-4 form-group">
                  <label>Titulo</label>
                  <input
                    required
                    value={movieData.title}
                    name="title"
                    onChange={onChange}
                    type="text"
                    className="form-control"
                  />
                </div>

                <div className="col-lg-6 col-md-12 form-group">
                  <label>Descripcion</label>
                  <input
                    value={movieData.description}
                    required
                    name="description"
                    onChange={onChange}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-lg-6 col-md-4 form-group">
                  <label>Stock</label>
                  <input
                    value={movieData.stock}
                    name="stock"
                    required
                    onChange={onChange}
                    type="number"
                    className="form-control"
                  />
                </div>

                <div className="col-lg-6 col-md-12 form-group">
                  <label>Precio de renta</label>
                  <input
                    value={movieData.rental_price}
                    name="rental_price"
                    required
                    onChange={onChange}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-lg-6 col-md-4 form-group">
                  <label>Precio venta</label>
                  <input
                    value={movieData.sale_price}
                    required
                    name="sale_price"
                    onChange={onChange}
                    type="text"
                    className="form-control"
                  />
                </div>

                <div className="col-lg-6 col-md-12 form-group">
                  <label>Imagen</label>
                  <input
                    required
                    onChange={fileHandle}
                    name="imagen"
                    type="file"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={cleanModal}
              >
                Cerrar
              </button>
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Modal detalle */}
      <div
        className="modal fade"
        id="detailModal"
        tabIndex="-1"
        aria-labelledby="detailModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="detailModalLabel">
                Detalle
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row mt-4 text-center">
                <div className="col-12">
                <img
                  src={`data:image/jpeg;base64,${movieData.img64}`}
                  width="160"
                  className="img-fluid justify-center img-card"
                  alt={movieData.title}
                  title={movieData.title}
                />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-lg-6 col-md-4 form-group">
                  <label>Titulo</label>
                  <input
                    readOnly
                    value={movieData.title}
                    name="title"
                    onChange={onChange}
                    type="text"
                    className="form-control"
                  />
                </div>

                <div className="col-lg-6 col-md-4 form-group">
                  <label>Precio venta</label>
                  <input
                    value={movieData.sale_price}
                    readOnly
                    name="sale_price"
                    onChange={onChange}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-lg-6 col-md-4 form-group">
                  <label>Stock</label>
                  <input
                    value={movieData.stock}
                    name="stock"
                    readOnly
                    onChange={onChange}
                    type="number"
                    className="form-control"
                  />
                </div>

                <div className="col-lg-6 col-md-12 form-group">
                  <label>Precio de renta</label>
                  <input
                    value={movieData.rental_price}
                    name="rental_price"
                    readOnly
                    onChange={onChange}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12 form-group">
                  <label>Descripcion</label>
                  <input
                    value={movieData.description}
                    readOnly
                    name="description"
                    onChange={onChange}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={cleanModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
