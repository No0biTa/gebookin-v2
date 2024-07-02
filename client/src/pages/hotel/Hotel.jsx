import React from 'react';
import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { formatPriceToMillion } from "../../utils/formatPrice";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`https://gebookin-api.onrender.com/api/v1/hotels/find/${id}`);
  const { dates = [], options = { room: 1 } } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const storedDates = sessionStorage.getItem('dates');
    if (storedDates) {
      const { startDate: storedStartDate, endDate: storedEndDate } = JSON.parse(storedDates);
      setStartDate(storedStartDate);
      setEndDate(storedEndDate);
    }
  }, []);

  useEffect(() => {
    if (dates.length > 0 && dates[0].endDate && dates[0].startDate) {
      setStartDate(dates[0].startDate);
      setEndDate(dates[0].endDate);
      sessionStorage.setItem('dates', JSON.stringify({ startDate: dates[0].startDate, endDate: dates[0].endDate }));
    }
  }, [dates]);

  const days = dates.length > 0 && dates[0].endDate && dates[0].startDate
      ? dayDifference(new Date(dates[0].endDate), new Date(dates[0].startDate))
      : 1; // Default to 1 day if dates are not defined

  useEffect(() => {
    console.log("Data fetched: ", data);
    console.log("Dates: ", dates);
    console.log("Options: ", options);
    console.log("Days: ", days);
  }, [data, dates, options, days]);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const isValidNumber = (value) => {
    return typeof value === 'number' && !isNaN(value);
  };

  const totalPrice = isValidNumber(days) && isValidNumber(data.cheapestPrice) && isValidNumber(options.room)
      ? days * data.cheapestPrice * options.room
      : 0;

  useEffect(() => {
    console.log("Total price: ", totalPrice);
  }, [totalPrice]);

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  const handleReserveSuccess = () => {
    console.log("Reservation success");
    toast.success("Rooms reserved successfully!");
  };

  return (
      <div>
        <Navbar />
        <Header type="list" />
        {loading ? (
            "loading"
        ) : (
            <div className="hotelContainer">
              {open && (
                  <div className="slider">
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="close"
                        onClick={() => setOpen(false)}
                    />
                    <FontAwesomeIcon
                        icon={faCircleArrowLeft}
                        className="arrow"
                        onClick={() => handleMove("l")}
                    />
                    <div className="sliderWrapper">
                      <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
                    </div>
                    <FontAwesomeIcon
                        icon={faCircleArrowRight}
                        className="arrow"
                        onClick={() => handleMove("r")}
                    />
                  </div>
              )}
              <div className="hotelWrapper">
                <button className="bookNow">Reserve or Book Now!</button>
                <h1 className="hotelTitle">{data.name}</h1>
                <div className="hotelAddress">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{data.address}</span>
                </div>
                <span className="hotelDistance">
              Excellent location – {data.distance}km from center
            </span>
                <span className="hotelPriceHighlight">
                  Book a stay over {new Intl.NumberFormat('id-ID', {
                                  style: 'currency',
                                  currency: 'IDR',
                                  minimumFractionDigits: 0,
                                }).format(data.cheapestPrice)} at this property and get a free airport taxi
                </span>

                <div className="hotelImages">
                  {data.photos?.map((photo, i) => (
                      <div className="hotelImgWrapper" key={i}>
                        <img
                            onClick={() => handleOpen(i)}
                            src={photo}
                            alt=""
                            className="hotelImg"
                        />
                      </div>
                  ))}
                </div>
                <div className="hotelDetails">
                  <div className="hotelDetailsTexts">
                    <h1 className="hotelTitle">{data.title}</h1>
                    <p className="hotelDesc">
                      {data.desc}
                    </p>
                  </div>
                  <div className="hotelDetailsPrice">
                    <h1>Perfect for a {days}-night stay!</h1>
                    <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                    <h2>
                      <b>{new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(totalPrice * 1000)}</b> ({days} nights)
                    </h2>
                    <button onClick={handleClick}>Reserve or Book Now!</button>
                  </div>
                </div>
              </div>
              <MailList />
              <Footer />
            </div>
        )}
        {openModal && <Reserve setOpen={setOpenModal} hotelId={id} onReserveSuccess={handleReserveSuccess} />}
        <ToastContainer />
      </div>
  );
};

export default Hotel;
