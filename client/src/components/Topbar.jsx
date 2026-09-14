

export default function Topbar({reserve = 0}){


    return(
        <nav className="flex justify-between p-4 bg-amber-200">
            <div>settings</div>
            <div className="flex gap-4 text-md">
                <span>Current Reserve: <span>{`$${reserve}`}</span></span>
                <span>September 14, 2026</span>
            </div>
        </nav>
    );
}