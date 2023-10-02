import { useEffect, useState } from "react";
import styles from "./detail.module.css";
import { useParams } from "react-router-dom";

export function Detail() {
  const { cripto } = useParams();

  useEffect(() => {
    function getData() {
      fetch(`https://reactcoins.free.beeceptor.com/coins&symbol=${cripto}`)
        .then((response) => response.json)
        .then();
    }

    getData();
  }, []);

  return <div></div>;
}
