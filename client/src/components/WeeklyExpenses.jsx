

export default function WeeklyExpenses({expenses = []}){


    return (
        <div>
            <ul>
                {expenses.map((expense, index) => {
                    return <li key={index}><span>${(expense.cost / 100).toFixed(2)}</span> <span>{expense.name}</span></li>
                })}
            </ul>
        </div>
    );
}