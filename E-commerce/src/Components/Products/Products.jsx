import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { FaStar } from "react-icons/fa";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { CiSearch } from "react-icons/ci";
import Badge from 'react-bootstrap/Badge';
import { FcDeleteDatabase } from "react-icons/fc";
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

const Products = () => {
  const [data, setData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedRating, setSelectedRating] = useState("");
  const [search, setSearch] = useState('');

  const getProducts = async () => {
    try {
      let res = await axios("https://fakestoreapi.com/products");
      if (res.status === 200) {
        setData(res.data);
      } else {
        console.log("Error in fetching data");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((item) => item !== value));
    }
  };

  const handlePriceChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedPrices([...selectedPrices, value]);
    } else {
      setSelectedPrices(selectedPrices.filter((item) => item !== value));
    }
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  };

  const handleFilter = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPrices([]);
    setSelectedRating("");
    setSearch('');
  };

  const filteredData = data.filter((item) => {
    const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
    const matchPrice = selectedPrices.length === 0 || selectedPrices.some((range) => {
      const [min, max] = range.split("-").map(Number);
      return item.price >= min && item.price <= max;
    });
    const matchRating = !selectedRating || Math.floor(item.rating.rate) === parseInt(selectedRating);
    const matchSearch = item.title.toLowerCase().includes(search);
    return matchCategory && matchPrice && matchRating && matchSearch;
  });

  return (
    <>
      <div className='w-25'>
        <Accordion defaultActiveKey="0" flush alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>All Categories</Accordion.Header>
            <Accordion.Body>
              {["electronics", "jewelery", "men's clothing", "women's clothing"].map((itm, idx) => (
                <div className="form-check" key={idx}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={itm}
                    checked={selectedCategories.includes(itm)}
                    onChange={handleCategoryChange}
                  />
                  <label className="form-check-label text-capitalize">{itm}</label>
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Prices</Accordion.Header>
            <Accordion.Body>
              {["0-100", "100-200", "200-300", "300-500", "500-1000"].map((range, idx) => (
                <div className="form-check" key={idx}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={range}
                    checked={selectedPrices.includes(range)}
                    onChange={handlePriceChange}
                  />
                  <label className="form-check-label">${range}</label>
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Ratings</Accordion.Header>
            <Accordion.Body>
              {[5, 4, 3, 2, 1].map((rating, idx) => (
                <div className="form-check" key={idx}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="ratingFilter"
                    value={rating}
                    checked={selectedRating === String(rating)}
                    onChange={handleRatingChange}
                  />
                  <label className="form-check-label">{rating} Stars & Up</label>
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="d-flex justify-content-center mt-3">
          <Button variant="light" className='border' onClick={clearFilters}>Clear Filters</Button>
        </div>
      </div>

      <div className="w-75">
        <div className="search_bar w-100 mb-3">
          <InputGroup>
            <InputGroup.Text><CiSearch /></InputGroup.Text>
            <Form.Control placeholder="Search Products" value={search} onChange={handleFilter} />
          </InputGroup>
        </div>

        <div className="products d-flex gap-1 flex-wrap">
          {filteredData.length > 0 ? filteredData.map((itm, id) => (
            <Card style={{ width: '18rem' }} key={id} className='p-2'>
              <div className="d-flex align-item-center justify-content-center">
                <img src={itm?.image} alt='Product_Img' width={200} height={200} style={{ objectFit: "contain" }} />
              </div>
              <Card.Body>
                <Card.Title className="text-truncate">{itm?.title || "NA"}</Card.Title>
                <div className="Ratings d-flex gap-1 mb-1 align-items-center">
                  {[...Array(Math.floor(itm?.rating?.rate || 0))].map((_, i) => (
                    <FaStar key={i} size={15} color='#c85c0c' />
                  ))}
                  <span>({itm?.rating?.count || 0})</span>
                </div>
                <Badge bg="light" className='p-2 mb-1 text-dark'>{itm?.category}</Badge>
                <Card.Text className='text-truncate mb-1'>{itm?.description}</Card.Text>
                <h6>${itm?.price}</h6>
              </Card.Body>
              <Card.Body className='d-flex justify-content-between'>
                <button className='border-0 rounded p-2 text-white' style={{ background: "#c85c0c" }}>Buy Now</button>
                <Card.Link href="#" className='text-decoration-none' style={{ color: "#c85c0c" }}>Add to cart</Card.Link>
              </Card.Body>
            </Card>
          )) : (
            <div className="d-flex flex-column align-items-center justify-content-center w-100" style={{ height: "85vh" }}>
              <span className='text-success h2 mb-0'>No Data Found</span>
              <FcDeleteDatabase size={100} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
