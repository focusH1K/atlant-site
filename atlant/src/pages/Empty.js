import { useNavigate, useParams } from 'react-router-dom'
import UserService from '../service/userService'
import { useEffect, useContext } from 'react'
import { Context } from '../index'
import { MDBSpinner } from 'mdb-react-ui-kit'

const Empty = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { store } = useContext(Context)

    useEffect(() => {
        try {
            if ( id !== undefined) {
                UserService.VkLogin(id).then((data) => {
                    localStorage.setItem('token', data.data.accessToken)
                    store.setUser(data.data.user)
                    store.setAuth(true)
                    navigate('/')
                })
            }
        } catch(e) {
            console.log(e)
        }
    }, [id])

    return (
        <MDBSpinner grow className='ms-2' color='dark'>
            <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>  
    )

}

export default Empty