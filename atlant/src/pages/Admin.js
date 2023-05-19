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
        <>
        <h2 className="mt-3 ms-3">Панель администратора</h2>
        <AdminSidebar />
        </>
    )
    
}

export default observer(Admin)