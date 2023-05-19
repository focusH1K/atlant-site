import React, { useContext, useEffect, useState } from 'react';
import { List, Button, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Context } from '../index';
import AdminService from '../service/adminService';
import AuthService from '../service/authService';
import { showErrorToast, showSuccessToast } from '../notifications/Toast';

const { confirm } = Modal;

const UserList = () => {
    const [users, setUsers] = useState([]);
    const { store } = useContext(Context);

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await AdminService.fetchUsers();
                setUsers(response.data);
            } catch (e) {
                console.log(e);
            }
        }

        getUsers();
    }, [store.user.role]);

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
            setUsers((users) =>
                users.map((user) => {
                    if (user.id === userId) {
                        return {
                            ...user,
                            role: newRole,
                        };
                    }
                    return user;
                })
            );
            showSuccessToast('Роль изменена');
        } catch (e) {
            showErrorToast(e.response.data.message);
        }
    };

    const handleDeleteUser = async (userId) => {
        confirm({
            title: 'Подтверждение удаления',
            icon: <ExclamationCircleOutlined />,
            content: 'Вы уверены, что хотите удалить этого пользователя?',
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Отмена',
            onOk: async () => {
                try {
                    await AuthService.deleteUser(userId);
                    setUsers((users) => users.filter((user) => user.id !== userId));
                    showSuccessToast('Пользователь успешно удален')
                } catch (e) {
                    showErrorToast(e.response.data.message)
                }
            },
        });
    };

    return (
        <>
            {Object.entries(userGroups).map(([role, users]) => (
                <React.Fragment key={`user_group_${role}`}>
                    <h6 className="bg-light p-2 border-top border-bottom mt-5">{role}</h6>
                    <List
                        style={{ minWidth: '22rem' }}
                        dataSource={users}
                        renderItem={(user) => (
                            <List.Item
                                key={`user_${user.id}`}
                                className="d-flex justify-content-between align-items-center"
                            >
                                <div className="d-flex align-items-center">
                                    <div className="ms-3">
                                        <h5 className="fw-bold mb-1">{user.username}</h5>
                                        <p className="text-muted mb-0">{user.email}</p>
                                    </div>
                                </div>
                                {user.role !== 'admin' && (
                                    <div className="d-flex justify-content-end mx-3">
                                        <Button
                                            onClick={() => handleRefreshRole(user.id, 'admin')}
                                            size="middle"
                                            type="primary"
                                            className="me-2"
                                            style={{ background: 'rgba(25, 25, 112, 0.8' }} 
                                        >
                                            Изменить роль
                                        </Button>
                                        <Button
                                            onClick={() => handleDeleteUser(user.id)}
                                            size="middle"
                                            danger
                                        >
                                            Удалить
                                        </Button>
                                    </div>
                                )}
                            </List.Item>
                        )}
                    />
                </React.Fragment>
            ))}
        </>
    );
};

export default UserList;