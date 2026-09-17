import { useState } from "react";

export default function Bottominput({setExpenses}) {

    const [cost, setCost] = useState("");
    const [name, setName] = useState("")

    function handleSubmit(e){
        e.preventDefault();
        if (name === "" || cost === "" || cost < 0) {
            return;
        }
        setExpenses((prevExpense) => [...prevExpense, {name:name, cost:(cost * 100)}]);
        setCost("");
        setName("");
    }

    return(
        <div className="mb-2 w-full fixed bottom-0 left-0">
            <form className="flex items-center w-full" onSubmit={handleSubmit}>
                <button type="submit" 
                    className="p-4 mx-2 border-solid border-3 rounded-4xl ">Add</button>
                <input value={name} 
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="flex-1 h-10 border-solid border-2 rounded-l-2xl" 
                    placeholder="Name..."></input>
                <input value={cost} 
                    onChange={(e) => setCost(e.target.value)}
                    type="number"
                    className="flex-1 h-10 mr-2 border-solid border-2 rounded-r-2xl" 
                    placeholder="Cost..."></input>
            </form>
        </div>
    );
}