import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Authentication = () => {
    const { token } = useSelector((state) => state.auth || {});
    return (
        <div>
            {!token && (
                <div>
                    <Link to="/login">
                        <button className="bg-[#000000] text-white px-7 py-2 rounded-lg text-md font-bold">
                            Login
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className="bg-[#000000] text-white px-7 py-2 rounded-lg text-md font-bold">
                            Signup
                        </button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Authentication
