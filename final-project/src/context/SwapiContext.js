import axios from "axios";
import { createContext, useEffect, useState } from "react";

const SwapiContext = createContext();

export const SwapiProvide = ({ children }) => {
  const [data, setData] = useState(null);
  const [type, setType] = useState("starships");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Aşağıda axios kullanarak apiden veriler çekilmiştir. "type" değişken olarak verilmiştir.
    async function getStarships() {
      let datas = [];
      let nextUrl = `https://swapi.dev/api/${type}/`;

      // Apide 10 tane yıldız gemisi veya karakter gösterildikten sonra nextUrl ile bir sonraki sayfaya yönlendirme yapılmaktadır. Burada bir sonraki sayfaya geçip tekrardan veriler alınmıştır. nextUrl true döndükçe bu satır devam edecektir. Concat metodu ile listeler birleştirilir.
      while (nextUrl) {
        const { data } = await axios.get(nextUrl);
        datas = datas.concat(data.results);
        nextUrl = data.next;
      }

      setData(datas);
    }

    getStarships();
  }, [type]);

  // Kullanılan veriler aşağıda dışarı aktarılır.
  const values = {
    data,
    type,
    setType,
    search,
    setSearch,
  };

  return (
    <SwapiContext.Provider value={values}>{children}</SwapiContext.Provider>
  );
};

export default SwapiContext;
