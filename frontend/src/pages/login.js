import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()

        const credentials = {username, password}
        const response = await fetch('/login', {
            credentials: "include",
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok) {
            setError(null)
            setUsername('')
            setPassword('')
            navigate('/dashboard')
        }
    }

    return (
        <form onSubmit={handleSubmit}>  
            <h1>Login</h1>
                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br></br>
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br></br>
               <button>Submit</button>
               {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login