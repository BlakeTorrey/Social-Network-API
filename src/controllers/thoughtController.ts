import { User, Thought } from "../models";
import { Response, Request } from 'express';

export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const thought = Thought.findOne({ _id: req.params.thoughtId }).select('-__v');

        if (!thought) {
            return res.status(404).json({ message: 'No Thought with that ID' });
        }

        res.json(thought);
        return;
    } catch (err) {
        return res.status(500).json(err);
    }
};

export const createThought = async (req: Request, res: Response) => {
    try {
        const { userId, username, thoughtText } = req.body;

        if (!userId || !thoughtText || !username) {
            return res.status(400).json({ message: 'UserId, username, and text are required for a thought' });
        }

        const newThought = await Thought.create({ username: username, thoughtText: thoughtText });

        const user = await User.findByIdAndUpdate(
            { id: userId },
            { $push: { thoughts: newThought._id } },
            { new: true, runValidators: true }
        );

        if (!user) {
            await Thought.findByIdAndDelete({ id: newThought._id });
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json({ message: 'Thought added to user', user, thought: newThought });
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const updateThought = async (req: Request, res: Response) => {
    try {
        const updateThought = await Thought.findOneAndUpdate(
            { id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!updateThought) {
            return res.status(404).json({ message: 'Unable to find thought' });
        }

        return res.json({ message: 'Thought Updated: ', updateThought });
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const { userId, thoughtId } = req.body;

        if (!userId || !thoughtId) {
            return res.status(404).json({ message: 'Unable to find userId or thoughtId'});
        }

        const deleteThought = await Thought.findOneAndDelete({id: thoughtId});

        if (!deleteThought) {
            return res.status(404).json({ message: 'Unable to delete thought'});
        }

        const user = await User.findOneAndUpdate(
            {id: userId},
            {$pull: {thoughts: thoughtId}},
            {new: true}
        );

        if(!user) {
            return res.status(404).json({ message: 'Unable to remove Thought from User'});
        }

        return res.json({ message: 'Deleted Thought, ', deleteThought, user});
    } catch (err) {
        return res.status(500).json(err);
    }
};
