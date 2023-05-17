import { useContext, useEffect } from 'react'
import { Context } from '../index'
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBContainer } from 'mdb-react-ui-kit'
import { IMG_URL } from '../http'

const AdminPurchasesList = () => {
  const { purchaseStore } = useContext(Context)

  useEffect(() => {
    purchaseStore.getAllPurchases()
  }, [purchaseStore])

  return (
    <MDBContainer>
    <MDBRow className='g-4'>
      {purchaseStore.purchases.length ? (
        purchaseStore.purchases.map((purchase) => (
          <MDBCol key={purchase.id} lg='4'>
            <MDBCard className='h-100 mt-5' style={{ border: '1px solid black', textAlign: 'center' }}>
              <MDBCardBody>
                <MDBCardTitle tag='h3'>Покупка №{purchase.id}</MDBCardTitle>
                <MDBCardText>
                  <strong>Пользователь:</strong> {purchase.user.username} 
                </MDBCardText>
                <MDBCardText>
                  <strong>Почта:</strong> {purchase.user.email}
                </MDBCardText>
                <MDBCardText>
                  <strong>Квартира:</strong> {purchase.flat.name} ({purchase.flat.area} кв.м)
                </MDBCardText>
                <MDBCardImage src={IMG_URL + purchase.flat.image} style={{width: 300, height: 300}} />
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

export default AdminPurchasesList