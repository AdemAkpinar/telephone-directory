import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const ListPersons = () => {
  const { personsState, groupsState } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(personsState.persons);

  useEffect(() => {
    const temp = personsState.persons.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())===true)
      setFilteredPersons(temp)
    ;
  }, [searchText]);

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
    <div className="container my-3 ">
      <div className="d-flex justify-content-between">
        <input
          className="form-control w-75"
          type="text"
          placeholder="Aramak istediğiniz kişi ismi"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
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
          {filteredPersons.map((person, index) => {
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

                  <Link
                    to={`/edit-person/${person.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Gncl
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
