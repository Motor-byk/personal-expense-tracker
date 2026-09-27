import { useState } from "react";

export default function Settings({user, onSave, onClose}) {

    const [balance, setBalance] = useState((user.weeklyAllowance / 100).toFixed(2));
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        // round so e.g. 0.29 * 100 = 28.999... becomes 29 cents
        const amount = Math.round(Number(balance) * 100);
        if (balance === "" || !(amount >= 0)) {
            setError("Enter a starting balance of $0.00 or more");
            return;
        }
        setError("");
        setSubmitting(true);
        try {
            await onSave(amount);
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black/40" onClick={onClose}>
            <form className="flex flex-col gap-3 w-72 p-4 bg-white rounded-2xl"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold">Settings</h2>
                <label className="flex flex-col gap-1">
                    <span>Weekly starting balance</span>
                    <input value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        className="h-10 px-2 border-solid border-2 rounded-2xl"
                        placeholder="0.00"></input>
                </label>
                <p className="text-sm text-gray-600 italic">Applies to this week and future weeks.</p>
                {error && <p className="text-red-700 text-sm">{error}</p>}
                <div className="flex gap-2">
                    <button type="submit"
                        disabled={submitting}
                        className="flex-1 p-2 border-solid border-3 rounded-4xl disabled:opacity-50">Save</button>
                    <button type="button"
                        onClick={onClose}
                        className="flex-1 p-2 border-solid border-2 rounded-4xl">Cancel</button>
                </div>
            </form>
        </div>
    );
}
