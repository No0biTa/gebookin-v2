import "./searchItem.css";
import {Link} from "react-router-dom";

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
      <img
        src={item.photos[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}km kira-kira</span>
        <span className="siTaxiOp">Free air mineral loh</span>
        <span className="siSubtitle">
          Hotel dengan suasana menarik dan berbafai fitur dan furniture terbaik!
        </span>
        <span className="siFeatures">
          {item.desc}
        </span>
        <span className="siCancelOp">Cancel gratis tidak dipungut denda</span>
        <span className="siCancelOpSubtitle">
          Kamu bisa cancel kemudian, tapi lebih baik book sekarang dulu gak sih!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">
              {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0,
                      }).format(item.cheapestPrice * 1000)}
            </span>
          <span className="siTaxOp">Sudah termasuk pajak dan fees lainnya ya</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">Lihat ketersediaannya</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
