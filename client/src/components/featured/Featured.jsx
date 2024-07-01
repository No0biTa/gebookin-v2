import "./featured.css";
import useFetch from "../../hooks/useFetch";

const Featured = () => {

    const {data,loading,error} = useFetch("https://gebookin-api.onrender.com/api/v1/hotels/countByCity?cities=Jakarta,Bandung,Bogor,Depok,Bekasi");

  return (
    <div className="featured">
        {loading ? (
            "Loading please wait"
        ) : (
            <>

            <div className="featuredItem">
        <img
          src="https://storage.googleapis.com/flip-prod-mktg-strapi/media-library/jakarta_133583f361/jakarta_133583f361.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Jakarta</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://bobobox.com/blog/wp-content//uploads/2023/06/Lokasi-Wisata-Sejarah-Bandung.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Bandung</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://cdn.idntimes.com/content-images/post/20180820/658412c13ec96900f182209eeb30d130.jpeg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Bogor</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div>
       <div className="featuredItem">
           <img
               src="https://image.popbela.com/content-images/post/20231009/afcb7f4359c12fb99600d65dea558d7e.jpg?width=1600&format=webp&w=1600"
               alt=""
               className="featuredImg"
           />
           <div className="featuredTitles">
               <h1>Depok</h1>
               <h2>{data[3]} properties</h2>
           </div>
       </div>
        <div className="featuredItem">
            <img
                src="https://fingerspot.com/upload/news/ori_G9G6AQ8N_20181113091642.jpg"
                alt=""
                className="featuredImg"
            />
            <div className="featuredTitles">
                <h1>Bekasi</h1>
                <h2>{data[4]} properties</h2>
            </div>
        </div>
            </>
        )}
    </div>
  );
};

export default Featured;
