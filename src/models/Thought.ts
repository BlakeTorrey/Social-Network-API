import { Schema, model, Document, ObjectId} from 'mongoose';

interface IReaction extends Document {
    reactionId: ObjectId;
    reactionBody: String;
    username: String;
    createdAt: Date;
}

interface IThought extends Document {
    thoughtText: String;
    createdAt: Date;
    username: String;
    reactions?: IReaction[];
}

interface IUser extends Document {
    username: String;
    email: String;
    thoughts: IThought[];
    friends?: ObjectId[];
}

const reactionSchema = new Schema<IReaction>(
    {
    reactionId: {Type: Schema.Types.ObjectId},
    reactionBody: {
                    type: String,
                    required: true,
                    max: 280,
                  },
    username: {type: String, required: true},
    createdAt: {
                type: Date,
                default: Date.now,
            },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        }
    }
);

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    },
);

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
        thoughts: [thoughtSchema],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
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

reactionSchema.virtual('createdAt').get(function (this: IReaction) {
    const date = new Date(this.createdAt);
    return date.toLocaleString();
});

thoughtSchema.virtual('createdAt').get(function (this: IThought) {
    const date = new Date(this.createdAt);
    return date.toLocaleString();
});
// these getters should return the date: (day/month/year) alongside the local time (hh:mm timezone)

thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions?.length;
});
// this will return the number of reactions to any given thought.

const User = model('User', userSchema);

export default User;