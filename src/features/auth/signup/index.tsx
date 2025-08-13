import { useEffect, useState } from "react";

export default function SignUp() {
    const [count, setCount] = useState(0) // Khởi tạo state count với giá trị ban đầu là 0
    function increment() {
        setCount(count + 1);
    }

    function decrement() {
        setCount(count - 1); // Cập nhật state
    }
    
    useEffect(() => { // Chỉ thực hiện arrow khi component được mount
        console.log("Hello");
    }, [])
    return (
        <div>
            <button onClick={increment}>+</button>
            <p>{count}</p>
            <button onClick={decrement}>-</button>
        </div>
    )
}