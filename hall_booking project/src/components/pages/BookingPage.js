import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import hall1 from '../../assets/images/hall1.jpg';
import hall2 from '../../assets/images/hall2.jpg';
import hall3 from '../../assets/images/hall3.jpg';
import hall4 from '../../assets/images/hall4.jpg';
import hall5 from '../../assets/images/hall5.jpg';
import hall6 from '../../assets/images/hall6.jpg';
import './BookingPage.css';

const hallData = [
    { id: 'jennis-hall', image: hall1, title: "Jennis Hall", description: "Jennis Hall offers a grand space ideal for large-scale events such as birthday parties and wedding receptions. Spanning over 3000 sq. ft. this hall can accommodate a significant number of guests comfortably. With elegant decor and versatile seating arrangements it’s perfect for creating memorable experiences. Our dedicated team will assist you in making every event special.", address: "123 Celebration Street, Coimbatore", location: "Near Central Park", type: ["Birthday Party", "Wedding", "Anniversary"], time: ["10:00 AM - 4:00 PM", "4:00 PM - 10:00 PM"], price: "$2000" },
    { id: 'harrys-hall', image: hall2, title: "Harry's Hall", description: "Harry's Hall is designed to host your grand celebrations with its spacious 4000 sq. ft. area. This hall is perfect for hosting large gatherings like weddings and milestone birthdays. It features stylish interiors and flexible layouts to cater to your event's needs, ensuring a sophisticated and enjoyable experience for all your guests.", address: "456 Event Avenue, Coimbatore", location: "Opposite City Mall", type: ["Wedding", "Corporate Event", "Large Gathering"], time: ["1:00 PM - 7:00 PM", "7:00 PM - 11:00 PM"], price: "$3000" },
    { id: 'grant-hall', image: hall3, title: "Grant Hall", description: "Grant Hall provides an expansive 5000 sq. ft. space that is ideal for large events including elaborate wedding receptions and birthday parties. The hall's sophisticated design and ample room allow for customized setups, from elegant dining arrangements to expansive dance floors. Let us help you create an unforgettable celebration in this majestic venue.", address: "789 Grand Road, Coimbatore", location: "Next to Green Park", type: ["Corporate Event", "Wedding", "Birthday Party"], time: ["9:00 AM - 5:00 PM", "5:00 PM - 11:00 PM"], price: "$4000" },
    { id: 'richie-hall', image: hall4, title: "Richie Hall", description: "Richie Hall is the epitome of grandeur with its 6000 sq. ft. area, making it an excellent choice for hosting high-profile events such as weddings and large corporate functions. Its luxurious ambiance, combined with versatile space options, provides the perfect setting for any major celebration. Our professional staff is here to ensure every detail is handled with care.", address: "101 Rich Street, Coimbatore", location: "Behind the Main Plaza", type: ["Large Gathering", "Corporate Event"], time: ["12:00 PM - 8:00 PM", "8:00 PM - 2:00 AM"], price: "$5000" },
    { id: 'golden-hall', image: hall5, title: "Golden Hall", description: "Golden Hall offers a luxurious 3500 sq. ft. space, ideal for grand celebrations such as weddings, anniversaries, and corporate events. With its elegant decor and modern amenities, Golden Hall provides a perfect setting for making your special occasions truly memorable. Our team is dedicated to providing exceptional service to ensure your event is a success.", address: "202 Golden Road, Coimbatore", location: "Adjacent to Silver Park", type: ["Anniversary", "Wedding"], time: ["2:00 PM - 10:00 PM", "10:00 PM - 4:00 AM"], price: "$3500" },
    { id: 'durian-hall', image: hall6, title: "Durian Hall", description: "Durian Hall, spanning 4500 sq. ft., offers a versatile space for a variety of events, from wedding receptions to corporate gatherings. The hall's contemporary design and state-of-the-art facilities ensure a comfortable and stylish environment for your guests. Our dedicated team will work with you to customize the hall to meet your specific event requirements.", address: "303 Durian Lane, Coimbatore", location: "Near Riverside", type: ["Wedding", "Corporate Event", "Birthday Party"], time: ["11:00 AM - 7:00 PM", "7:00 PM - 1:00 AM"], price: "$4500" }
];

const BookingPage = () => {
    const { hallId } = useParams();
    const navigate = useNavigate();
    const hall = hallData.find(hall => hall.id === hallId);

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [bookingError, setBookingError] = useState(''); // State for error message

    const handleBooking = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/bookings/add', {
                hallId: hallId,
                date: date,
                time: time,
                hallName: hall ? hall.title : 'Unknown Hall',
                contactEmail: contactEmail
            });

            if (response.status === 201) {
                navigate('/payment', {
                    state: {
                        hallId: hallId,
                        contactEmail: contactEmail,
                        hallName: hall ? hall.title : 'Unknown Hall',
                        hallPrice: hall ? hall.price : 'N/A'
                    }
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setBookingError('Hall is not available on the selected date. Please choose another date.'); // Set error message
            } else {
                console.error('Error during booking:', error);
                setBookingError('An unexpected error occurred. Please try again later.'); // Set general error message
            }
        }
    };

    if (!hall) {
        return <div className="error-message">Hall not found</div>;
    }

    return (
        <div className="booking-page-container">
            <h2 className="booking-header">Booking Details for {hall.title}</h2>
            <div className="hall-image-container">
                <img src={hall.image} alt={hall.title} className="hall-image" />
            </div>
            <div className="hall-details-container">
                <h1>{hall.title}</h1>
                <p>{hall.description}</p>
                <p><strong>Location:</strong> {hall.location}</p>
                <p><strong>Price:</strong> {hall.price}</p>
            </div>

            <div className="booking-form-container">
                <h2>Book This Hall</h2>
                <form className="booking-form" onSubmit={handleBooking}>
                    <div className="form-group">
                        <label htmlFor="date">Select Date:</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                        {bookingError && <div className="booking-error-message">{bookingError}</div>} {/* Display error message */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">Select Time:</label>
                        <select
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        >
                            <option value="">Select Time</option>
                            {hall.time.map((timeOption, index) => (
                                <option key={index} value={timeOption}>
                                    {timeOption}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact-email">Contact Email:</label>
                        <input
                            type="email"
                            id="contact-email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit">Book Now</button>
                </form>
            </div>
        </div>
    );
};

export default BookingPage;
