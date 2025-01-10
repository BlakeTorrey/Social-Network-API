import { User } from '../models/index';
import { Request, Response } from 'express';


export const GetAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.userId }).select('-__v');

        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
        };

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
        };

        // await Thought.deleteMany({ _id: { $id: user.thoughts }}); if thoughts is not embedded in users.
        res.json({ message: 'User and User Data has been deleted.'});
    } catch (err) {
        res.status(500).json(err);
    };
};