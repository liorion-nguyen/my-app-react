import { User } from "src/shared/types/user.type";
import { Status } from "../../../shared/enums/user.enum";
import { useEffect, useState } from "react";

export default function Login() {
    const status: Status = Status.APPROVED;
    const [users, setUsers] = useState<User[]>([]); // init users state as an empty array 
    const getUser = async() => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data); // Update the state with the fetched users
    }

    useEffect(() => { // Fetch users when the component mounts
        getUser();
    }, []);
    return (
        // jsx
        <div style={{ 
            backgroundColor: 'grey',
            padding: '20px',
            borderRadius: '5px',
        }}>
           {
            users.map((user) => (
                <div key={user.id} style={{ marginBottom: '10px' }}>
                    <h2>{user.name}</h2>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Company: {user.company.name}</p>
                    <p>Status: {status}</p>
                    <p>{user.address.city}</p>
                </div>
            ))
           }
        </div>
    )
}  