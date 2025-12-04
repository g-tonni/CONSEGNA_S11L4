// import { useState } from 'react'
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { saveResults, searchValue } from '../redux/actions'

const MainSearch = () => {
  // const [query, setQuery] = useState('')
  // const [jobs, setJobs] = useState([])

  const dispatch = useDispatch()

  // const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?search=";

  const handleChange = (e) => {
    dispatch(searchValue(e.target.value))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    /* try {
      const response = await fetch(baseEndpoint + query + "&limit=20");
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    } */
    dispatch(saveResults())
  }

  const jobs = useSelector((currState) => {
    return currState.search.results
  })

  const query = useSelector((currState) => {
    return currState.search.value
  })

  const load = useSelector((currState) => {
    return currState.search.loading
  })

  const err = useSelector((currState) => {
    return currState.search.error
  })

  return (
    <Container>
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <h1 className="display-1">Remote Jobs Search</h1>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="Type and Press Enter"
            />
          </Form>
        </Col>
        <Col xs={10} className="mx-auto mb-5">
          {err && (
            <div className="text-center p-5 border border-danger rounded-4 bg-danger bg-opacity-10 mt-4">
              <p className="m-0 fs-4">Search error, please try again later</p>
            </div>
          )}
          {load && query === '' && (
            <div className="text-center p-5 border border-dark rounded-4 bg-dark bg-opacity-10 mt-4">
              <p className="m-0 fs-4">Search for results</p>
            </div>
          )}
          {load && query !== '' && (
            <div className="text-center p-5">
              <Spinner animation="border" variant="dark" />
            </div>
          )}
          {jobs.map((jobData) => (
            <Job key={jobData._id} data={jobData} />
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default MainSearch
