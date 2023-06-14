import React, { useEffect, useState } from "react";
import styles from "./cssAdminComponents/commands.module.css";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Commands() {
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [commands, setCommands] = useState([]);
  const [order, setOrder] = useState("desc"); // "desc" for descending, "asc" for ascending

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/commands?page=${page}&order=${order}`
        );
        setCommands(response.data.data);
        setNumberOfPages(response.data.last_page);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page, order]);

  function handleClick(params) {
    navigate(`/adminPannel/detailsCommand/${params}`);
  }

  const toggleOrder = () => {
    setOrder(order === "desc" ? "asc" : "desc");
  };

  return (
    <>
      <Stack>
     
        <div id={styles.spaceUp}></div>
       
        <div id={styles.commandsContainer}>
          <span id={styles.title}>commands</span>
          <div className={styles.toggleOrder}>
  <button
    className={`${styles.toggleButton} ${order === "asc" ? styles.active : ""}`}
    onClick={toggleOrder}
  >
    old/new
  </button>
</div>
          <div style={{ width: "100%" }}>
            {commands.map((command) => (
              <div
                className={styles.listCommand}
                key={command.id}
                onClick={() => handleClick(command.id)}
              >
                <span>
                  {command.name}{" "}
                  <span className={styles.quantity}>x{command.quantity}</span>
                </span>{" "}
                <span>{moment(command.created_at).fromNow()}</span>
              </div>
            ))}
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
        </div>
        
      </Stack>
    </>
  );
}

export default Commands;
