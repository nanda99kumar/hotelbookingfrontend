import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/HotelApp.css'; // Create this CSS file for custom styles if needed

const HotelApp = () => {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    customerName: '',
    numberOfCustomers: '',
    fromDate: '',
    toDate: '',
  });

  useEffect(() => {
    fetchRooms();
    fetchBookings();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:8080/apicall/hotel/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/apicall/hotel/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prevBooking) => ({ ...prevBooking, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/apicall/hotel/book', newBooking);
      console.log(response.data);

      toast.success('Room booked successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });

      fetchBookings();
    } catch (error) {
      console.error('Error booking room:', error);

      toast.error('Failed to book room. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-4">Hotel Booking System</h1>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2>Rooms</h2>
              <ul>
                {rooms.map((room) => (
                  <li key={room.id}>
                    {room.roomNumber} - {room.roomType}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2>Bookings</h2>
              <ul>
                {bookings.map((booking) => (
                  <li key={booking.id}>
                    {booking.customerName} - {booking.room.roomNumber} - {booking.fromDate} to {booking.toDate}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h2>Book a Room</h2>
          <form onSubmit={handleBookingSubmit}>
           <label>
                       Customer Name:
                       <input
                         type="text"
                         name="customerName"
                         value={newBooking.customerName}
                         onChange={handleInputChange}
                         required
                       />
                     </label>
                     <br />
                     <br />
                     <label>
                       Number of Customers:
                       <input
                         type="number"
                         name="numberOfCustomers"
                         value={newBooking.numberOfCustomers}
                         onChange={handleInputChange}
                         required

                       />
                     </label>
                     <br />
                     <br />

                              <label>
                               Email  :
                                            <input
                                              type="email"
                                              name="email"
                                              value={newBooking.email}
                                              onChange={handleInputChange}
                                              required

                                            />
                                          </label>

                                          <br />
                                          <br />
                            <label>
                               Mobile Number  :
                                            <input
                                              type="tel"
                                              name="mobileNumber"
                                              value={newBooking.mobileNumber}
                                              onChange={handleInputChange}
                                              required

                                            />
                                          </label>

                                          <br />
                                          <br />

                     <label>
                       From Date:
                       <input
                         type="date"
                         name="fromDate"
                         value={newBooking.fromDate}
                         onChange={handleInputChange}
                         required
                       />
                     </label>
                     <br />
                     <br />
                     <label>
                       To Date:
                       <input
                         type="date"
                         name="toDate"
                         value={newBooking.toDate}
                         onChange={handleInputChange}
                         required
                       />
                     </label>
                     <br />
                     <br/>
            <button type="submit" className="btn btn-primary mt-3">
              Book Room
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default HotelApp;
