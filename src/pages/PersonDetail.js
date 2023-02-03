import React from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import api from "../api/api";
import urls from "../api/urls";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const PersonDetail = () => {
  const params = useParams();
  const [myPerson, setMyPerson] = useState(null);
  const [personGroup, setPersonGroup] = useState(null);
  useEffect(() => {
    api
      .get(`${urls.persons}/${params.personId}`)
      .then((resPerson) => {
        setMyPerson(resPerson.data);
        api
          .get(`${urls.groups}/${resPerson.data.groupId}`)
          .then((resGroup) => {
            setPersonGroup(resGroup.data);
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  }, []);
  if (myPerson === null || personGroup === null) return null;
  return (
    <div>
      <Header />
      <div className="container my-5">
        <table class="table">
          <tbody>
            <tr>
              <th scope="row">Adı Soyadı</th>
              <td>{myPerson.name + " " + myPerson.surname}</td>
            </tr>
            <tr>
              <th scope="row">Telefon Numarası</th>
              <td>{myPerson.number}</td>
            </tr>
            <tr>
              <th scope="row">Grup</th>
              {<td>{personGroup.name}</td>}
            </tr>
          </tbody>
        </table>

        <Link className="btn btn-warning" to={"/"}>
          Geri
        </Link>
      </div>
    </div>
  );
};

export default PersonDetail;
