import Topbar from "./components/Topbar";
import WeeklyExpenses from "./components/WeeklyExpenses";
import Bottominput from "./components/Bottominput";

function App() {

    //temp
    const tempweeklyexpense = [
                                {name: "Costco Hotdog", cost: 150},
                                {name: "Steam Frame", cost: 105900},
                                {name: "Feet Pics", cost: 69696700}];

    return (
        <div className="flex flex-col min-h-screen">
            <Topbar reserve={1000} />
            <main className="grow m-4">
                <h2 className="text-2xl font-bold">Weekly Balance</h2>
                <h3 className="text-xl font-bold text-green-800">$100</h3>
                <div>
                    <button className="text-sm text-blue-950 underline italic">Expand</button>
                    <WeeklyExpenses expenses={tempweeklyexpense}/>
                </div>
            </main>
            <Bottominput/>
        </div>
    );
}

export default App
