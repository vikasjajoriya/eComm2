import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import React from 'react'


const Filters = () => {
  return (
    <div className='w-25 '>
      <Accordion defaultActiveKey="0" flush alwaysOpen>
        <Accordion.Item eventKey="0" >
          <Accordion.Header>All Category</Accordion.Header>
          <Accordion.Body >
            {
              ["electronics", "jewelery", "mens's clothing", "women's clothing"].map((itm, idx) => {
                return (
                  <div className="form-check" key={`Checkbox Id : - ${idx}`}>
                    <input className="form-check-input" type="checkbox" value={itm} />
                    <label className="form-check-label text-capitalize" htmlFor="flexCheckDefault">
                      {itm}
                    </label>
                  </div>
                )
              })
            }
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="0" >
          <Accordion.Header>Prices</Accordion.Header>
          <Accordion.Body>
            {
              ["0 - 100", "100 - 200", "200 - 300", "300 - 500", "500 - 1000"].map((itm, idx) => {
                return (
                  <div className="form-check" key={`Checkbox Id : - ${idx}`}>
                    <input className="form-check-input" type="checkbox" value={itm} />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      ${itm}
                    </label>
                  </div>
                )
              })
            }
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="0" >
          <Accordion.Header>Ratings</Accordion.Header>
          <Accordion.Body>
            {
              ["Electronics", "Jewelery", "Mens's Clothing", "Women's Clothing"].map((itm, idx) => {
                return (
                  <div className="form-check" key={`Checkbox Id : - ${idx}`}>
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id={idx + 1} />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">{itm}</label>
                  </div>
                )
              })
            }
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="d-flex justify-content-center">
        <Button variant="light" className='border'>Clear Filters</Button>
      </div>
    </div>
  )
}

export default Filters;