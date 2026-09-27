import { useState } from "react";

export default function AuthForm({onAuth}) {

    const [mode, setMode] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e){
        e.preventDefault();
        setError("");
        try {
            const response = await fetch(`/api/auth/${mode}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.message);
                return;
            }
            onAuth(data);
        } catch {
            setError("Could not reach the server");
        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form className="flex flex-col gap-3 w-72" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold">{mode === "login" ? "Log in" : "Create account"}</h2>
                <input value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    className="h-10 px-2 border-solid border-2 rounded-2xl"
                    placeholder="Email..."></input>
                <input value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                    minLength={mode === "register" ? 8 : undefined}
                    className="h-10 px-2 border-solid border-2 rounded-2xl"
                    placeholder="Password..."></input>
                {error && <p className="text-red-700 text-sm">{error}</p>}
                <button type="submit" className="p-2 border-solid border-3 rounded-4xl">
                    {mode === "login" ? "Log in" : "Sign up"}
                </button>
                <button type="button"
                    onClick={() => setMode(mode === "login" ? "register" : "login")}
                    className="text-sm text-blue-950 underline italic">
                    {mode === "login" ? "Need an account? Sign up" : "Have an account? Log in"}
                </button>
            </form>
        </div>
    );
}
