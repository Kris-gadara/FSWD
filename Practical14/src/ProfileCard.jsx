import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ name, photo, bio }) => {
  return (
    <div className="profile-card">
      <img src={photo} alt={name} className="profile-photo" />
      <h2>{name}</h2>
      <p>{bio}</p>
    </div>
  );
};

export default ProfileCard;

