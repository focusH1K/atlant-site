import AdminService from '../service/adminService';
import React, { useContext, useEffect, useState } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBBtn } from 'mdb-react-ui-kit';
import { Context } from '../index';
import AuthService from '../service/authService';
import { showErrorToast, showSuccessToast } from '../notifications/Toast';

const UserList = () => {
    const [users, setUsers] = useState([])
    const { store } = useContext(Context)

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await AdminService.fetchUsers();
                setUsers(response.data);
            } catch (e) {
                console.log(e);
            }
        }

        getUsers()
    }, [store.user.role])

    function getUserRole(user) {
        if (user.role === 'admin') {
            return 'Администраторы';
        } else {
            return 'Пользователи';
        }
    }

    const userGroups = users.reduce((groups, user) => {
        const role = getUserRole(user);
        if (!groups[role]) {
            groups[role] = [];
        }
        groups[role].push(user);
        return groups;
    }, {});

    const handleRefreshRole = async (userId, newRole) => {
        try {
            await AdminService.refreshRole(userId, newRole);
            setUsers(users.map((user) => {
                if (user.id === userId) {
                    return {
                        ...user,
                        role: newRole,
                    };
                }
                return user;
            }));
            showSuccessToast('Роль изменена')
        } catch (e) {
            showErrorToast(e.response.data.message)
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await AuthService.deleteUser(userId)
            setUsers(users.filter((user) => user.id !== userId))
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <>
                    {Object.entries(userGroups).map(([role, users]) => (
                        <React.Fragment key={`user_group_${role}`}>
                            <h6 className='bg-light p-2 border-top border-bottom mt-5'>{role}</h6>
                            <MDBListGroup style={{ minWidth: '22rem' }} light>
                                {users.map((user) => (
                                    <MDBListGroupItem
                                        key={`user_${user.id}`}
                                        className='d-flex justify-content-between align-items-center'
                                    >
                                        <div className='d-flex align-items-center'>
                                            <div className='ms-3'>
                                                <p className='fw-bold mb-1'>{user.username}</p>
                                                <p className='text-muted mb-0'>{user.email}</p>
                                            </div>
                                        </div>
                                        {user.role !== 'admin' && (
                                            <div className='d-flex justify-content-end mx-3'>
                                                <MDBBtn onClick={() => handleRefreshRole(user.id, 'admin')} size='md' rounded color='dark' className='me-2'>
                                                    Изменить роль
                                                </MDBBtn>
                                                <MDBBtn onClick={() => handleDeleteUser(user.id)} size='md' rounded color='danger'>
                                                    Удалить
                                                </MDBBtn>
                                            </div>
                                        )}
                                    </MDBListGroupItem>
                                ))}
                            </MDBListGroup>
                        </React.Fragment>
                    ))}

        </>
    );
}

export default UserList