import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true");

  return (
      <div className="fp">
        {loading ? (
            "Loading"
        ) : (
            <>
              {data.map((item) => (
                  <div className="fpItem" key={item._id}>
                    <img
                        src={item.photos[0]}
                        alt=""
                        className="fpImg"
                    />
                    <span className="fpName">{item.name} </span>
                    <span className="fpCity">{item.city}</span>
                      <span className="fpPrice">
                          Starting from {new Intl.NumberFormat('id-ID', {
                                                  style: 'currency',
                                                  currency: 'IDR',
                                                  minimumFractionDigits: 0,
                                              }).format(item.cheapestPrice * 1000)}
                        </span>
                    {item.rating && <div className="fpRating">
                      <button>{item.rating} </button>
                      <span>Excellent></span>
                    </div>}
                  </div>
              ))}
            </>
        )}
      </div>
  );
};

export default FeaturedProperties;
