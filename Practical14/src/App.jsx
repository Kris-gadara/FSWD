import React from "react";
import ProfileCard from "./ProfileCard";

function App() {
  return (
    <div>
      <h1>Personal Profile Card</h1>
      <ProfileCard 
        name="KRIS GADARA" 
        photo="https://via.placeholder.com/150" 
        bio="Web developer with a passion for learning new technologies."
      />
    </div>
  );
}

export default App;
