import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import styles from '../styles/Profile.module.css';

function Profile({ user }) {
    return (
        <>
            <Image src={user.avatarUrl} alt={user.name} className={styles.avatar} width={300} height={300} />
            <h3>{user.name}, {user.age}</h3>
            <p>{user.bio}</p>
        </>
    );
}
Profile.propTypes = {
    user: PropTypes.shape({
        avatarUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        bio: PropTypes.string.isRequired,
    }).isRequired,
};

export default Profile;
