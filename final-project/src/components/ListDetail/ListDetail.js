import React, { useContext } from "react";
import "./listDetail.scss";
import { Link, useParams } from "react-router-dom";
import SwapiContext from "../../context/SwapiContext";
import typeDatas from "../../typeDatas";
import Loading from "../Loading/Loading";

function ListDetail() {
  const { name } = useParams(); // useParams ile urldeki name bölümü alınır.
  const { data, type } = useContext(SwapiContext);

  // data verileri gelmedi ise loading componenti gösterilir.
  if (!data) {
    return <Loading />;
  }

  // Options değerlerini oluştururuz. Key ve value veririz. Buradaki amaç typeDatas.js dosyasındaki verilere ulaşmaktır.
  const options = [
    { key: "starships", value: typeDatas.starships },
    { key: "people", value: typeDatas.people },
    { key: "planets", value: typeDatas.planets },
    { key: "species", value: typeDatas.species },
    { key: "vehicles", value: typeDatas.vehicles },
  ];

  // select ile item.key ile type eşleştirmesi yaparız. Bu eşleştirme sonucunda value değerini alırız. info ile id değerini almaya çalışıyoruz. O yüzden isimleri eşleştirerek id değerlerine ulaşırız.
  const select = options.find((item) => item.key === type)?.value;
  const info = typeDatas.infoIndex.find((item) => item.name === name);
  return (
    <div className="listDetail">
      <h1>{data[info.id].name}</h1>
      <div className="listDetail__main">
        {/* Burada starships dışındaki typelarda fotoğraf gösterilmemektedir. Çünkü apide resimler bulunmadığından resimleri ek bir assets dosyasına eklendi.  */}
        {type === "starships" && (
          <div>
            <img
              src={require(`../../assets/starships/${name}.png`)}
              alt="pic"
            />
          </div>
        )}

        <div>
          <ul>
            {/* Burada typeDatas.js de ilk kısım labelken, diğer kısım apiden veri çekmek için kullandığımız alanlardır. Bu verileri burada düzenleriz.  */}
            {select.map((item, index) => {
              const label = item[0];
              const property = item[1];
              return (
                <>
                  <li>
                    <span>{label}:</span> {data[info.id][property]}
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>
      {/* Bu buton ile ana sayfaya yönlendirme yaparız.  */}
      <Link to={`/`}>
        <button className="backHome">Back Home Page</button>
      </Link>
    </div>
  );
}

export default ListDetail;
