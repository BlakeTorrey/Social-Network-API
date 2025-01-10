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

// create getters to format the createdAt property for each schema.