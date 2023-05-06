import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./cssAdminComponents/user.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
function User(props) {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    const Data = props.data;
    axios
      .post(`http://127.0.0.1:8000/api/userFilter?page=${page}`, Data)
      .then((response) => {
        setData(response.data.data);
        setNumberOfPages(response.data.last_page);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props]);
  function handleClick(idUser) {
    props.userEdit(
      true,
      data.find((data) => data.user_id === idUser)
    );
  }
  return (
    <>
      <Stack>
        <div>
          <div>
            {data ? (
              <div>
                {data.map((data) => (
                  <div key={data.user_id} className={styles.userDiv}>
                    <div className={styles.name}>
                      <span>{data.name}</span> <span>{data.name_role}</span>{" "}
                    </div>{" "}
                    <button
                      className={styles.editbtn}
                      onClick={() => handleClick(data.user_id)}
                    >
                      edit
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {numberOfPages > 1 ? (
          <Pagination
            count={numberOfPages}
            page={page}
            onChange={handleChange}
            id={styles.paginate}
          />
        ) : (
          ""
        )}
      </Stack>
    </>
  );
}

export default User;
