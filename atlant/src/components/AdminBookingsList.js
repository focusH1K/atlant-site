import { useContext, useEffect } from 'react'
import { Context } from '../index'
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBContainer } from 'mdb-react-ui-kit'
import { IMG_URL } from '../http'

const AdminBookingsList = () => {
  const { bookingStore } = useContext(Context)

  useEffect(() => {
    bookingStore.getAllBookings()
  }, [bookingStore])

  return (
    <MDBContainer>
    <MDBRow className='g-4'>
      {bookingStore.bookings.length ? (
        bookingStore.bookings.map((booking) => (
          <MDBCol key={booking.id} lg='4'>
            <MDBCard className='h-100 mt-5' style={{ border: '1px solid black', textAlign: 'center' }}>
              <MDBCardBody>
                <MDBCardTitle tag='h3'>Бронирование №{booking.id}</MDBCardTitle>
                <MDBCardText>
                  <strong>Пользователь:</strong> {booking.user.username} 
                </MDBCardText>
                <MDBCardText>
                  <strong>Почта:</strong> {booking.user.email}
                </MDBCardText>
                <MDBCardText>
                  <strong>Квартира:</strong> {booking.flat.name} ({booking.flat.area} кв.м)
                </MDBCardText>
                <MDBCardImage src={IMG_URL + booking.flat.image} style={{width: 300, height: 300}} />
                <MDBCardText>
                  <strong>Дата начала бронирования:</strong> {booking.check_in_date}
                </MDBCardText>
                <MDBCardText>
                  <strong>Дата окончания бронирования:</strong> {booking.check_out_date}
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))
      ) : (
        <p className='mb-3'>По вашему запросу ничего не найдено</p>
      )}
    </MDBRow>
    </MDBContainer>
  )
}

export default AdminBookingsList