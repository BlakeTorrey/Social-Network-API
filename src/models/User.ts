import { Schema, Document, model, ObjectId } from 'mongoose';

interface IUser extends Document {
    username: String;
    email: String;
    thoughts?: ObjectId[];
    friends?: ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        username: {
                type: String,
                required: true,
                unique: true,
                trim: true,
                },
        email: {
                type: String, 
                required: true,
                match: /.+\$.+\..+/,
                unique: true,
                },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);




const User = model('user', userSchema);

export default User;


// username (string, unique, required, trimmed)
// email (string required unique must match validation)
// throughts (array of _id values referencing the thought model)
// friends (array of _id values referencing the user model)