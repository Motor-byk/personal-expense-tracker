import { toStringCents } from "../util/expenseCalc";

export default function WeeklyExpenses({expenses = [], startingBalance = 0}){
        return (
        <div className="overflow-y-auto overflow-x-auto max-h-80 max-w-md">
            <ul className="w-50">
                <li className="flex justify-between"> 
                    <span className="italic text-green-700">{toStringCents(startingBalance)}</span>
                    <span className="italic">Starting Balance</span>    
                </li>
                {expenses.map((expense, index) => {
                    return <li className="flex justify-between" key={index}>
                                <span className="text-red-700">-{toStringCents(expense.cost)}</span> 
                                <span className="">{expense.name}</span>
                            </li>
                })}
                <hr class="border-t border-gray-300 my-2" />
                <li className="flex justify-between">
                    <span class="underline font-semibold text-red-800">{toStringCents(expenses.reduce((total, cur) => total + cur.cost, 0))}</span>
                    <span>Total Spent</span>
                </li>
            </ul>
        </div>
    );
}