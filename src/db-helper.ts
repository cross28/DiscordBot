import mongoose from 'mongoose';
import { DB_URL } from './config';
import { User, IUser } from './models/user';

if (!DB_URL) throw new Error('DB_URL does not exist.');

const DB_NAME = 'DiscordBot';

mongoose.connect(DB_URL, {
  dbName: DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a MongoClient
// const client: MongoClient = new MongoClient(DB_URL);

// Create a user in the database
export function createUser(userId: string, username: string): boolean {
  User.findOne({ userId })
    .exec()
    .then((doc) => {
      // If the user exists already
      if (doc) return false;

      // Otherwise create the user
      const user: IUser = new User({
        _id: new mongoose.Types.ObjectId(),
        userId,
        username,
        currency: 0,
      });

      user.save();

      return true;
    })
    .catch((err) => { throw err; });

  return false;
}

// Update user currency
export async function updateCurrency(userId: string, amountToAppend: number): Promise<void> {
  // Gets the current currency of the user
  let currentUserCurrency = await User.findOne({ userId }).exec().then((doc) => doc?.currency);
  if (!currentUserCurrency) currentUserCurrency = 0;

  // Appends the specified amount to the current user currency
  User.findOneAndUpdate({ userId }, { $set: { currency: currentUserCurrency + amountToAppend } }, { new: true }, (err, doc) => {
    if (err) console.log(err);
    console.log(doc);
  }).exec();
}
