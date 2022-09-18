import React from "react";
import Card from 'react-bootstrap/Card';

function RawData(props) {
    const t = props
     console.log(t.t)
    return (
        <>
         <Card>
        <Card.Body>{JSON.stringify(t.t)}</Card.Body>
      </Card>
        </>
    )
}

export default RawData