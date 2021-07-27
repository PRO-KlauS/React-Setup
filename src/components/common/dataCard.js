import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DataCard = ({ data, companyType }) => {
  const { t } = useTranslation();
  return (
    <Col md={6} xl={4} className="details-info">
      <Card>
        <Card.Body
          className={`pad-3${
            data.length > 0 || (companyType && companyType.value)
              ? ''
              : ' no-data-card-msg'
          }`}>
          {data.length > 0 &&
            data.map((item) => {
              return (
                <div className="text-data">
                  <h4>
                    {item.data_point === 'uen'
                      ? item.data_point.toUpperCase() + ':'
                      : item.data_point + ':'}
                  </h4>
                  <p>{item.value}</p>
                </div>
              );
            })}
          {companyType.value && (
            <div className="text-data">
              <h4>{companyType.data_point + ':'}</h4>
              <p>{companyType.value}</p>
            </div>
          )}
          {data.length === 0 && !companyType.value && (
            <p>{t('messages.noData')}</p>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default DataCard;
