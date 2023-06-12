import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loader() {

  return (
    <>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 9999,
          }}
        >
          <Spinner animation="border" variant="light" className='me-3'/>
          Loading ...
        </div>
    </>
  );
}

export default Loader;
