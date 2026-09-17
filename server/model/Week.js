const mongoose = require('mongoose');
const Schema = mongoose.Scheme;

const expenseSchema = new Schema({
    amount: {type: Number, required: true, min: 0},
    itemName: {type: String, required: true},
    spentAt: {type: Date, default: Date.now},
})

const weekSchema = new Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    weekStart: {type: Date, required: true},
    weekKey: {type: String, required: true},
    startingBalance: {type: Number, required: true},
    carriedIn: {type: Number, default: 0},
    totalSpend: {type: Number, default: 0},
    expenses: [expenseSchema],
    status: {type: String, enum: ["open", "closed"], default: "open"},
    closedAt: Date,
    rollovertoReserve:{ type: Number, default: 0},
}, {timestamps: true});

weekSchema.index({ userId: 1, weekStart: -1 }, { unique: true });

weekSchema.virtual('remaining').get(function () { /* ... */ });

export default mongoose.model("Week", weekSchema);