import { Button, notification, Table, Tag } from "antd";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../../../redux/feature/Endpoints/EndPoint"
import axios from "axios";
import Swal from "sweetalert2";
import { TUser } from "../../../utils/global";


const UserManagement = () => {

    const { data, refetch } = useGetAllUsersQuery(null)
    const [deleteUser] = useDeleteUserMutation()

    const handleAdmin = (user: TUser) => {
        axios.put(`https://backend-psi-six-59.vercel.app/api/auth/${user?._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.success === true) {
                    refetch()
                    notification.success({
                        message: "Great",
                        description: "You made him as ADMIN"
                    })
                }
            })
    }
    const handleUser = (user: TUser) => {
        axios.patch(`https://backend-psi-six-59.vercel.app/api/auth/${user?._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.success === true) {
                    refetch()
                    notification.warning({
                        message: "Yaap",
                        description: "You made him User"
                    })
                }
            })
    }

    const handleDelete = (_id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    deleteUser(_id)
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "You successfully delete the user",
                        icon: "success"
                    });
                } catch (err) {
                    console.log(err)
                }
            }
        });
    }



    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            responsive: ['xs', 'sm', 'md', 'lg'] as ('xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl')[],
            render: (name: string) => <span style={{ fontWeight: 'bold', color: '' }}>{name}</span>
        },
        {
            title: 'Photo',
            dataIndex: 'photo',
            key: 'photo',
            render: (text: string) => <img src={text} alt="user" style={{ width: 40, borderRadius: '50%' }} />,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['xs', 'sm', 'md', 'lg'] as ('xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl')[],
            render: (email: string) => (
                <a href={`mailto:${email}`} style={{ color: '' }}>
                    {email}
                </a>
            )
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            responsive: ['xs', 'sm', 'md', 'lg'] as ('xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl')[],
            render: (role: string) => (
                <Tag color={role === 'ADMIN' ? 'green' : 'blue'}>
                    {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'USER'}
                </Tag>
            ),
        },
        {
            title: 'Delete User',
            key: 'actions',
            responsive: ['xs', 'sm', 'md', 'lg'] as ('xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl')[],
            render: (_ : unknown, record : TUser) => (
                <div className="flex gap-2">
                    <Button
                        className=' bg-red-700 text-white border-none'
                    onClick={() => handleDelete(record._id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
        {
            title: 'Update Role',
            key: 'actions',
            responsive: ['xs', 'sm', 'md', 'lg'] as ('xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl')[],
            render: (_ :unknown, record : TUser) => (
                <div className="flex gap-2">
                    {record.role === 'ADMIN' ? (
                        <Button onClick={() => handleUser(record)} className=' bg-purple-800 text-white border-none' >
                            Make User
                        </Button>
                    ) : (
                        <Button
                            className='bg-pink-600 text-white border-none'
                            onClick={() => handleAdmin(record)}
                        >
                            Make Admin
                        </Button>
                    )}
                </div>
            ),
        },
    ];


    return (
        <div>
            <div className="lg:ml-14">
                <Table
                    columns={columns}
                    style={{ backgroundColor: '#f0f2f5', color: 'black' }}
                    dataSource={data?.data}
                    rowKey="_id"
                    pagination={{ pageSize: 5 }}
                    className="custom-table"
                    scroll={{ x: true }}
                />
            </div>
        </div>
    )
}

export default UserManagement