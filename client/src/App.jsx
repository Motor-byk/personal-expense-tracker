import Topbar from "./components/Topbar";
import WeeklyExpenses from "./components/WeeklyExpenses";
import Bottominput from "./components/Bottominput";
import AuthForm from "./components/AuthForm";
import { toStringCents } from "./util/expenseCalc";
import { useState, useEffect } from "react";

function App() {
    //temp
    const tempweeklyexpense = [
                                {name: "Costco Hotdog", cost: 150},
                                {name: "$20 dollar bill", cost: 2000},
                                {name: "Monster Energy", cost: 375}];
    const data = {startingBalance : 10000}

    const [user, setUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [startingBalance] = useState(data.startingBalance);
    const [expenses, setExpenses] = useState(tempweeklyexpense);
    const currentBalance = startingBalance - expenses.reduce((totalExpense, expense) => totalExpense + expense.cost, 0)
    
    useEffect(() => {
        fetch("/api/auth/me")
            .then(response => response.ok ? response.json() : null)
            .then((data) => setUser(data))
            .catch(error => {
                console.error('Error fetching user data:', error);
            })
            .finally(() => setAuthChecked(true));
    },[]);

    async function handleLogout() {
        await fetch("/api/auth/logout", {method: "POST"});
        setUser(null);
    }

    function handleExpand() {
        setExpanded(!expanded);
    }

    if (!authChecked) {
        return null;
    }

    if (!user) {
        return <AuthForm onAuth={setUser} />;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Topbar reserve={1000} onLogout={handleLogout} />
            <main className="grow m-4">
                <h2 className="text-2xl font-bold">Weekly Balance</h2>
                {
                    currentBalance > 0 ? 
                    <h3 className="text-xl font-bold text-green-800">{toStringCents(currentBalance)}</h3> :
                    <h3 className="text-xl font-bold text-red-800">-{toStringCents(currentBalance * -1)}</h3> // kinda goofy solution im sorry future me );
                }
                <div>
                    <button onClick={handleExpand} className="text-sm text-blue-950 underline italic">Expand</button>
                    {expanded && <WeeklyExpenses expenses={expenses} startingBalance={startingBalance}/>}
                </div>
            </main>
            <Bottominput setExpenses={setExpenses}/>
        </div>
    );
}

export default App
