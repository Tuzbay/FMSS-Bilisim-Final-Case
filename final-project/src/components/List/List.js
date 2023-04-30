import React, { useContext, useEffect, useState } from "react";
import "./list.scss";
import SwapiContext from "../../context/SwapiContext";
import Loading from "../Loading/Loading";
import typeDatas from "../../typeDatas";
import { Link } from "react-router-dom";
import slugify from "slugify";

function List() {
  const { data, type } = useContext(SwapiContext);
  const [isLoading, setIsLoading] = useState(true);
  const [more, setMore] = useState(8); // Bu satır ile ana sayfada gösterilecek eleman sayısını seçeriz.

  const options = [
    { key: "starships", value: typeDatas.starships, count: 36 },
    { key: "people", value: typeDatas.people, count: 82 },
    { key: "planets", value: typeDatas.planets, count: 60 },
    { key: "species", value: typeDatas.species, count: 37 },
    { key: "vehicles", value: typeDatas.vehicles, count: 39 },
  ];

  const select = options.find((item) => item.key === type)?.value;
  const key = options.find((item) => item.key === type)?.key;
  const count = options.find((item) => item.key === type)?.count;

  // Data gelse dahi loading componenti 3 saniye ile gösterilecektir.
  useEffect(() => {
    setIsLoading(true);
    let timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [type]);

  // Türler arası geçiş yapıldığında önceden değiştirilen more değişkeni sayfa yenilendiğinde 8'e tekrardan alınsın diye useEffect kullanıldı.
  useEffect(() => {
    setMore(8);
  }, [type]);

  if (isLoading) {
    return <Loading />;
  }

  // Bu fonksiyon çalıştırıldığında +8 eleman daha gösterilir.
  const handleMoreItems = () => {
    setMore((prev) => prev + 8);
  };

  return (
    <div className="list">
      <h2 className="list__main">{type}</h2>
      <div className="container">
        {/* data verisi yoksa null gösterilmesi isteniyor fakat varsa listelemeyi yapsın.  */}
        {!data
          ? null
          : // Slice ile belirli elemanların gösterilmesi isteniyor. more, setMore değişkenleri bu yüzden yapılmıştır.
            data.slice(0, more).map((item, index) => (
              // Link içerisinde eğerki starships türündeyse gönderim yapsın istiyorum. Diğer türlerin detay sayfasına girilmesi engellenir.
              <Link
                key={item.id}
                to={type === "starships" && `/${type}/${slugify(item.name)}`}
              >
                <div className="wrapper">
                  {/* Sadece starships türünde ise fotoğrafların gösterilmesini istiyorum.  */}
                  {type && type === "starships" && (
                    <div className="image">
                      <img
                        src={require(`../../assets/${type}/${slugify(
                          item.name
                        )}.png`)}
                        alt=""
                      />
                    </div>
                  )}

                  <ul>
                    {/* Burada typeDatas bölümündeki en baştaki 3 bilginin gösterilmesi için yazılmış bir kod bloğudur.  */}
                    {select.slice(0, 3).map((item) => {
                      const label = item[0];
                      const property = item[1];
                      return (
                        <>
                          <li key={item.id}>
                            <span>{label}:</span> {data[index][property]}
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </div>
              </Link>
            ))}
      </div>

      {/* Eğerki starships türündeysek "Load More" butonu ile geri kalan liste elemanları yüklenir.  */}
      {key.includes("starships") && more < count && (
        <button className="list__loadButton" onClick={handleMoreItems}>
          Load More
        </button>
      )}
      {/* Starships türünde değilse bu buton aktif olmuyor ve bu özelliğin yakında ekleneceği belirtiliyor. */}
      {!key.includes("starships") && (
        <button style={{ cursor: "not-allowed" }} className="list__loadButton">
          Coming Soon...
        </button>
      )}
    </div>
  );
}

export default List;
