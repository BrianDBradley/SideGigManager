import { useState } from "react"

const SignUp = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newUser = {username, password}

        const response = await fetch('/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        })

        const json = await response.json()

        if(response.ok) {
            setUsername("")
            setPassword("")
            setError(null)
        }
        else {
            setError(json.error)
        }
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h1>Create a New Account</h1>
            <br></br>

            <label>Username: </label>
            <input
                type="string"
                onChange={(e)=>setUsername(e.target.value)}
                id="username"
            />

            <label>Password: </label>
            <input
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                id="password"
            />

            <br></br>

            <button>Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default SignUp