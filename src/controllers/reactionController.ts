import { Thought } from "../models/index.js";
import { Request, Response } from "express";


export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }

        return res.json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
};

export const removeReaction = async (req: Request, res: Response) => {
    try {
        const { reactionId } = req.body;

        if (!reactionId) {
            return res.status(400).json({ message: "reaction ID is required." });
        }

        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull : { reactions: { _id: reactionId}}},
            { runValidators: true, new: true}   
        );
        
        if (!thought) {
            return res.status(404).json({ message: 'No reaction found with that ID'});
        }

        return res.json({ message: "Reaction deleted: ", thought});
    } catch (err) {
        return res.status(500).json(err);
    }
};
