import React, { useState } from 'react';
import API from '../services/api';
function BookingForm({ expertId }) {
const [form, setForm] = useState({
name: '',
email: '',
phone: '',
date: '',
timeSlot: '',
notes: ''
});
const handleSubmit = async (e) => {
e.preventDefault();
try {
await API.post('/bookings', { ...form, expertId });
alert('Booking successful');
} catch (error) {
9
alert(error.response.data.message);
}
};
return (
<form onSubmit={handleSubmit}>
<input placeholder="Name" onChange={e => setForm({...form, name:
e.target.value})} />
<input placeholder="Email" onChange={e => setForm({...form, email:
e.target.value})} />
<button type="submit">Book</button>

</form>
);
}
export default BookingForm;