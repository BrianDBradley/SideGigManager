import { useState } from "react"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

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
        }
    }

    return (
        <form>  
            <h1>Login</h1>
                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    onSubmit={handleSubmit}
                />
                <br></br>
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    onSubmit={handleSubmit}
                />
                <br></br>
               <button>Submit</button>
        </form>
    )
}

export default Login