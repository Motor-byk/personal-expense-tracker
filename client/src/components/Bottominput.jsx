

export default function Bottominput() {


    return(
        <div className="flex items-center mb-2">
            <button className="p-4 mx-2 border-solid border-3 rounded-4xl ">Add</button>
            <input className="flex-1 h-10 border-solid border-2 rounded-l-2xl" placeholder="Name..."></input>
            <input className="flex-1 h-10 mr-2 border-solid border-2 rounded-r-2xl" placeholder="Cost..."></input>
        </div>
    );
}