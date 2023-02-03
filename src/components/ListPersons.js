import React from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";
import { Link } from "react-router-dom";

const ListPersons = () => {
  const { personsState, groupsState } = useSelector((state) => state);
  const dispatch = useDispatch();

  const deletePerson = (id) => {
    if (window.confirm("Silmek istediğinize emin misiniz?") === true) {
      dispatch({ type: actionTypes.personActions.DELETE_PERSONS_START });
      api
        .delete(`${urls.persons}/${id}`)
        .then((res) => {
          dispatch({
            type: actionTypes.personActions.DELETE_PERSONS_SUCCESS,
            payload: id,
          });
        })
        .catch((err) => {
          dispatch({
            type: actionTypes.personActions.DELETE_PERSONS_FAIL,
            payload: "Kişi silerken hata oluştu",
          });
        });
    }
  };

  return (
    <div className="my-5">
      <div className="d-flex justify-content-end">
        <Link to={"/add-person"} className="btn btn-warning">
          Kişi Ekle
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Adı Soyadı</th>
            <th scope="col">Telefon</th>
            <th scope="col">Gruplar</th>
            <th scope="col">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {personsState.persons.map((person, index) => {
            const myGroup = groupsState.groups.find(
              (item) => item.id === person.groupId
            );
            return (
              <tr key={person.id}>
                <td>{person.name + " " + person.surname}</td>
                <td>{person.number}</td>
                <td>{myGroup.name}</td>
                <td>
                  <button
                    onClick={() => deletePerson(person.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Sil
                  </button>

                  <Link
                    to={`/person-detail/${person.id}`}
                    className="btn btn-sm btn-secondary"
                  >
                    Dty
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListPersons;