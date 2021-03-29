import React from 'react';
// import { Button } from 'core/@components/Button';
// <Button variant="primary">
//   NEXT
// </Button>
export default ({ youtubeId }) => (
  <div className="video">

    <iframe
      src={`https://www.youtube.com/embed/${youtubeId}`}
      frameBorder="0"
    />
  </div>
);
