import { Schema, model, Document, ObjectId, Types } from 'mongoose';

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


const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280,
        },
        username: { type: String, required: true },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
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
        id: false,
    },
);

thoughtSchema.virtual('thoughtsFormattedCreatedAt').get(function (this: IThought) {
    const date = new Date(this.createdAt);
    return date.toLocaleString();
});

reactionSchema.virtual('reactionsFormattedCreatedAt').get(function (this: IReaction) {
    const date = new Date(this.createdAt);
    return date.toLocaleString();
});


// these getters should return the date: (day/month/year) alongside the local time (hh:mm timezone)

thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions?.length;
});
// this will return the number of reactions to any given thought.

const Thought = model('Thought', thoughtSchema);

export default Thought;