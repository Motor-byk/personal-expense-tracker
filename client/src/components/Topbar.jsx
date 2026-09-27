

export default function Topbar({reserve = 0, weekStart, onLogout}){

    // weekStart is stored as UTC midnight, so format in UTC to avoid showing the previous day
    const weekStartLabel = weekStart && new Date(weekStart).toLocaleDateString(undefined, {
        timeZone: "UTC", month: "long", day: "numeric", year: "numeric",
    });

    return(
        <nav className="flex justify-between p-4 bg-amber-200">
            <div>settings</div>
            <div className="flex gap-4 text-md">
                <span>Current Reserve: <span>{`$${reserve}`}</span></span>
                <span>{weekStartLabel}</span>
                <button onClick={onLogout} className="underline">Logout</button>
            </div>
        </nav>
    );
}
