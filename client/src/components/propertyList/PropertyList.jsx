import "./propertyList.css";
import useFetch from "../../hooks/useFetch";

const PropertyList = () => {

    const {data,loading,error} = useFetch("/hotels/countByType");

    const images = [
        "https://cdn0-production-images-kly.akamaized.net/oSgflu88GES_yPHxHhW2S6owtCE=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3386715/original/094552600_1614241094-Double_Tree_Jakarta.jpg",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/455613071.jpg?k=680a0f6fab928725bbb5ece932800731883b705a355331386c3ea12f5e6c10be&o=&hp=1",
        "https://media-cdn.tripadvisor.com/media/photo-s/28/fd/37/ed/pearl-farm-beach-resort.jpg",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/425133099.jpg?k=6690189171bfc7e68dc87ca57ba0d93d558658c8f3d5e523e8f8dfe3289346f9&o=&hp=1",
        "https://cove-blog-id.sgp1.cdn.digitaloceanspaces.com/cove-blog-id/2022/04/kamar-cove-katalia.webp"
    ];
  return (
    <div className="pList">
        {loading ? (
            "loading"
        ):(
            <>
                {data &&
                    images.map((img,i) => (
                    <div className="pListItem" key={i}>
                    <img
                        src={img}
                        alt=""
                        className="pListImg"
                    />
                    <div className="pListTitles">
                        <h1>{data[i]?.type}</h1>
                        <h2>{data[i]?.count} {data[i]?.type}</h2>
                    </div>
                </div>))}
            </>
        )}
    </div>
  );
};

export default PropertyList;
