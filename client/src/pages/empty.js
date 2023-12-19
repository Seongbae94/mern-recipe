import React from "react";

const EmptyPage = () => {
  return (
    <div className="empty">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI7QrOQs93QzJxyd5ZdnVSk46SRXtJy7x5RQ&usqp=CAU"
        alt="empty-page-image"
      />
      <p>No recipes exist...</p>
    </div>
  );
};

export default EmptyPage;
