import { clerkClient } from '@clerk/express';

export const protectRoute = (req, res, next) => {
    if(!req.auth.userId) {
        console.error('Unauthorized access - no user ID found in request');
        return res.status(401).json({ message: 'Unauthorized access - you must be logged in' });
    }   
    next();
};

export const requireAdmin = async (req, res, next) => {
    try{
        const user = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = user.primaryEmailAddress?.emailAddress === process.env.ADMIN_EMAIL;
        
        if (!isAdmin) {
            return res.status(403).json({ message: 'Forbidden - admin access required' });
        }
    next();
    }
    catch (error) {
        console.error('Error checking admin status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }   

};