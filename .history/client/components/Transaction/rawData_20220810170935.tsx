import React from "react";
import Card from 'react-bootstrap/Card';

function RawData(props) {
    const t = props
    
    return (
        <>
         <Card>
        <Card.Body>{t}</Card.Body>
      </Card>
        </>
    )
}

export default RawData