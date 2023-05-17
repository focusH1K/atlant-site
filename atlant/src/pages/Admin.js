import { useContext } from "react"
import AdminSidebar from "../components/AdminSideBar"
import { Context } from "../index"
import { useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite"

const Admin = () => {
    const { store } = useContext(Context)
    const navigate = useNavigate()

    if (!store.isAdmin) {
        return navigate('/profile')
    }

    return (
        <AdminSidebar />
    )
    
}

export default observer(Admin)