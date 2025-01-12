import { User } from '../models/index.js';
import { Request, Response } from 'express';

export const addFriend = async (req: Request, res: Response) => {
    try {
        const { userId, friendId } = req.params;
        if (!userId || !friendId) {
            return res.status(400).json({ message: 'unable to find user or friend ID' });
        }

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { friends: friendId } },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User could not add friend' });
        }

        return res.json({ message: 'Friend Successfully saved.', user });
    } catch (err) {
        return res.status(500).json(err);
    }
;}

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const { userId, friendId } = req.params;
        if (!userId || !friendId ) {
            return res.status(400).json({ message: 'Unable to find user or friend ID'});
        }

        const user = await User.findOneAndUpdate(
            {_id: userId },
            { $pull: { friends: friendId} },
            {new: true, runValidators: true}
        )

        if (!user) {
            return res.status(404).json({ message: 'User could not remove friend'});
        }

        return res.json({ message: 'Friend Successfully Removed.', user});
    } catch (err) {
        return res.status(500).json(err)
    }
}