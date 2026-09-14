import Topbar from "./components/Topbar";
import WeeklyExpenses from "./components/WeeklyExpenses";

function App() {

    //temp
    const tempweeklyexpense = [
                                {name: "Costco Hotdog", cost: 150},
                                {name: "Steam Frame", cost: 105900},
                                {name: "Feet Pics", cost: 69696700}];

    return (
        <div className="flex flex-col">
            <Topbar reserve={1000} />
            <h2>Weekly Balance</h2>
            <h3>$100</h3>
            <div>
                <button>Expand</button>
                <WeeklyExpenses expenses={tempweeklyexpense}/>
            </div>
        </div>
    );
}

export default App
