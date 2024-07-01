import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const [formattedPrice, setFormattedPrice] = useState(""); // State to hold formatted price
  const navigate = useNavigate();

  const { data, loading } = useFetch("/hotels");

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "price") {
      const formattedValue = value.replace(/\D/g, ''); // Remove non-digit characters
      const formattedPriceString = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(formattedValue); // Format to IDR
      setFormattedPrice(formattedPriceString);
      setInfo((prev) => ({ ...prev, [id]: formattedValue }));
    } else {
      setInfo((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleRoomsChange = (e) => {
    setRooms(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room.trim() }));
    try {
      await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
      navigate("/rooms");
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="top">
            <h1>Add New Room</h1>
          </div>
          <div className="bottom">
            <div className="right">
              <form>
                {roomInputs.map((input) => (
                    <div className="formInput" key={input.id}>
                      <label>{input.label}</label>
                      {input.id === "price" ? (
                          <div className="priceInput">
                            <input
                                id={input.id}
                                type={input.type}
                                placeholder={input.placeholder}
                                onChange={handleChange}
                            />
                            <span className="priceDescription">Enter the price in Indonesian Rupiah (IDR).</span>
                            <div className="formattedPrice">{formattedPrice}</div> {/* Display formatted price */}
                          </div>
                      ) : (
                          <input
                              id={input.id}
                              type={input.type}
                              placeholder={input.placeholder}
                              onChange={handleChange}
                          />
                      )}
                    </div>
                ))}
                <div className="formInput">
                  <label>Rooms</label>
                  <textarea
                      id="rooms"
                      onChange={handleRoomsChange}
                      placeholder="Give comma-separated room numbers."
                  />
                </div>
                <div className="formInput">
                  <label>Choose a hotel</label>
                  <select
                      id="hotelId"
                      onChange={(e) => setHotelId(e.target.value)}
                  >
                    {loading
                        ? "loading"
                        : data &&
                        data.map((hotel) => (
                            <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                        ))}
                  </select>
                </div>
                <button onClick={handleClick}>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default NewRoom;
