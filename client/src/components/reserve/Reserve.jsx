import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reserve = ({ setOpen, hotelId }) => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
    const { dates } = useContext(SearchContext);
    const navigate = useNavigate();

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());
        const dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }

        return dates;
    };

    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            allDates.includes(new Date(date).getTime())
        );

        return !isFound;
    };

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms((prevSelectedRooms) =>
            checked
                ? [...prevSelectedRooms, value]
                : prevSelectedRooms.filter((roomId) => roomId !== value)
        );
    };

    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map(async (roomId) => {
                    const res = await axios.put(`/rooms/availability/${roomId}`, {
                        dates: allDates,
                    });
                    return res.data;
                })
            );
            toast.success("Room reserved successfully!", {
                position: "top-right",
                autoClose: 3000,
            });
            setOpen(false);
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (err) {
            toast.error("Reservation failed. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="rClose"
                    onClick={() => setOpen(false)}
                />
                <h2 className="reserve-title">Select Your Rooms:</h2>
                {loading ? (
                    <p>Loading rooms...</p>
                ) : (
                    <div>
                        {data.map((item) => (
                            <div className="rItem" key={item._id}>
                                <div className="rItemInfo">
                                    <h3 className="rTitle">{item.title}</h3>
                                    <p className="rDesc">{item.desc}</p>
                                    <p className="rMax">
                                        Max people: <b>{item.maxPeople}</b>
                                    </p>
                                    <p className="rPrice">
                                        Price: {new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                        minimumFractionDigits: 0,
                                    }).format(item.price)}
                                    </p>
                                </div>
                                <div className="rSelectRooms">
                                    {item.roomNumbers.map((roomNumber) => (
                                        <div className="room" key={roomNumber._id}>
                                            <label>
                                                Room {roomNumber.number}
                                                <input
                                                    type="checkbox"
                                                    value={roomNumber._id}
                                                    onChange={handleSelect}
                                                    disabled={!isAvailable(roomNumber)}
                                                />
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <button onClick={handleClick} className="rButton">
                    Reserve Now!
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Reserve;
