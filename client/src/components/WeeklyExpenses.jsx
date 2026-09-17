import { toStringCents } from "../util/expenseCalc";

export default function WeeklyExpenses({expenses = [], startingBalance = 0}){
        return (
        <div className="overflow-y-auto overflow-x-auto max-h-80 max-w-md">
            <ul>
                <li key="startingBalance">{toStringCents(startingBalance)}</li>
                {expenses.map((expense, index) => {
                    return <li key={index}><span>{toStringCents(expense.cost)}</span> <span>{expense.name}</span></li>
                })}
            </ul>
        </div>
    );
}