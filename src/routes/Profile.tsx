import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Profile: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return <div>No user data found</div>;
    }

    return (
        <div>
            <h2 className="text-xl text-orange-400 bg-slate-800">
                {user.name.first} {user.name.middle} {user.name.last}
            </h2>
        </div>
    );
};

export default Profile;
