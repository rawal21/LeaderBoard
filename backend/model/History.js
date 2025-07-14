import mongoose from "mongoose";

const historySchama =  mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: String,
  pointsAwarded: Number,
  createdAt: { type: Date, default: Date.now }  
});

const history = mongoose.model("history" , historySchama );

export default history;