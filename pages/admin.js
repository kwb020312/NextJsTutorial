import Axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button } from "semantic-ui-react"

export default function Admin() {
    const router = useRouter()
    const [isLogin , setIsLogin] = useState(false)
    const checkLogin = () => {
        
        Axios.get('/api/isLogin').then(res => {
            if(res.status === 200 && res.data.name) {
                setIsLogin(true)
            } else {
                router.push("/login")
            }
        })
    }
    const logout = () => {
        Axios.get('/api/logout').then(res => {
            if(res.status === 200) {
                router.push("/")
            }
        })
    }

    useEffect(() => {
        checkLogin()
    },[])
    return (
        <>
            <h1>Admin</h1>
            {isLogin && <Button onClick={logout}>Logout</Button>}
        </>
    )
}