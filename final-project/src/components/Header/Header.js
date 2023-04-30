import React, { useContext, useState } from "react";
import "./header.scss";
import starship from "../../starships";
import SwapiContext from "../../context/SwapiContext";
import { Link, useNavigate } from "react-router-dom";
import slugify from "slugify";
import nameModel from "../../modelName";

function Header() {
  // useContext ile verileri bu componente aktarıyoruz.
  const { type, setType, search, setSearch } = useContext(SwapiContext);
  const [filteredData, setFilteredData] = useState([]);
  // navigate ile react-router-dom'da yönlendirmeleri tamamlıyoruz.
  const navigate = useNavigate();

  // handleSubmit ile input bölümüne yazılan yıldız gemilerinin araması için enter tuşuna basıldığında yönlendirme sağlanır.
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(search);
    setSearch("");
    navigate(`${type}/${slugify(search)}`);
  };

  // handleChange ile input alanına yazılan yazılar görüntülenir. Ayrıca yazılan her kelimenin baş harfinin büyük olması için bir kod yazılmıştır.
  const handleChange = (e) => {
    const value = e.target.value;
    const capitalizedValue = value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setSearch(capitalizedValue);

    // Aşağıdaki kod satırlarında popup için bir filtreleme yapılır. O filtreleme bu bölüm ile sağlanır. Tüm harfler küçük harf olarak alınmıştır. Ayrıca startWith ile ilk harf dikkate alınır.
    const starWarsDatas = starship.filter((starWarsData) =>
      starWarsData
        .toLocaleLowerCase()
        .startsWith(e.target.value.toLocaleLowerCase())
    );
    setFilteredData(starWarsDatas);
  };

  // Search alanına bir şey yazdığımızda popup ekranı açılır. Onun dışında ekran açılmaz.
  let popup = search === "" ? false : true;

  return (
    <div className="header">
      <div className="header__bottom">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write a something in Starwars Universe..."
            value={search}
            onChange={handleChange}
          />
        </form>
        {/* Aşağıdaki kod satırlarında popup içerisinde li elemanına tıklandığında yönlendirme işlemi yapılır. Bu yönlendirme işleminde model girilmesi halinde model ismini name'e çevirerek yönlendirme işlemi yapar. Bu sayede model ve name ile arama yapılabilir. Slugify ile boşluk bırakılmaz, araya tire konulur. */}
        {popup && (
          <ul className="popup">
            {filteredData.map((star) => {
              return (
                <Link
                  to={`/starships/${
                    nameModel.find((item) => item.model === star)?.name ||
                    slugify(star)
                  }`}
                >
                  <li
                    onClick={() => {
                      setSearch("");
                    }}
                  >
                    {star}
                  </li>
                </Link>
              );
            })}
          </ul>
        )}

        {/* Aşağıdaki kod satırı ile türler arası seçim yapılır. */}
        <select id="starwars" onChange={(e) => setType(e.target.value)}>
          <option value="starships" defaultValue={"starships"}>
            Starships
          </option>
          <option value="people">People</option>
          <option value="planets">Planets</option>
          <option value="species">Species</option>
          <option value="vehicles">Vehicles</option>
        </select>
      </div>
    </div>
  );
}

export default Header;
