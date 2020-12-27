import React from 'react';
import { Col, Card } from 'react-bootstrap';

const DetailCard = ({
  value,
  label,
  imagePath,
  colorClass,
  xs,
  sm,
  md,
  lg,
  xl,
}) => {
  return (
    <Col xs={xs || 4} sm={sm || 6} md={md || 4} lg={lg || 4} xl={xl || 3}>
      <Card>
        <Card.Body className="pad-3">
          <div className="text">
            <h3>{value}</h3>
            <h5>{label}</h5>
          </div>
          <div className={`icon ${colorClass}`}>
            <img src={imagePath} alt="" className="svg-icon" />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default DetailCard;
