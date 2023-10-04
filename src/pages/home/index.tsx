import { FormEvent, useEffect, useState } from "react";
import styles from "./home.module.css";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

interface CoinProps {
  name: string;
  delta_24h: string;
  price: string;
  symbol: string;
  volume_24h: string;
  market_cap: string;
  formatedPrice: string;
  formatedMarket: string;
  formatedDelta: number;
}

interface DataProps {
  coins: CoinProps[];
}

export function Home() {
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function getData() {
      fetch(
        "https://sujeitoprogramador.com/api-cripto/?key=67f9141787211428&pref=BRL"
      )
        .then((response) => response.json())
        .then((data: DataProps) => {
          let coinsData = data.coins.slice(0, 15);
          let price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          const formatResult = coinsData.map((item) => {
            const formated = {
              ...item,
              formatedPrice: price.format(Number(item.price)),
              formatedMarket: price.format(Number(item.market_cap)),
              formatedDelta: Number(item.delta_24h.replace(",", "."))
            };

            return formated;
          });

          setCoins(formatResult);
        });
    }

    getData();
  }, []);

  function handleSearch(e: FormEvent) {
    e.preventDefault();

    if (inputValue == "") return;

    navigate(`/detail/${inputValue}`);
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Digite o símbolo da moeda: BTC..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">
          <BiSearch size={30} color="#fff" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
          </tr>
        </thead>

        <tbody id="tbody">
          {coins.map((coin) => (
            <tr className={styles.tr} key={coin.name}>
              <td className={styles.tdLabel} data-label="Moeda">
                <Link to={`/detail/${coin.symbol}`} className={styles.link}>
                  <span>{coin.name}</span> | {coin.symbol}
                </Link>
              </td>
              <td className={styles.tdLabel} data-label="Mercado">
                {coin.formatedMarket}
              </td>
              <td className={styles.tdLabel} data-label="Preço">
                {coin.formatedPrice}
              </td>
              <td
                className={
                  coin?.formatedDelta >= 0 ? styles.tdProfit : styles.tdLoss
                }
                data-label="Volume"
              >
                <span>{coin.formatedDelta}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
