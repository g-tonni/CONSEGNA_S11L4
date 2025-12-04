import { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import Job from './Job'
import { useParams } from 'react-router-dom'

const CompanySearchResults = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const params = useParams()

  const baseEndpoint =
    'https://strive-benchmark.herokuapp.com/api/jobs?company='

  useEffect(() => {
    getJobs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getJobs = async () => {
    try {
      const response = await fetch(baseEndpoint + params.company)
      if (response.ok) {
        const { data } = await response.json()
        setJobs(data)
        setLoading(false)
      } else {
        alert('Error fetching results')
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(true)
    }
  }

  return (
    <Container>
      <Row>
        <Col className="my-3">
          <h1 className="display-4">Job posting for: {params.company}</h1>
          {error && (
            <div className="text-center p-5 border border-danger rounded-4 bg-danger bg-opacity-10 mt-4">
              <p className="m-0 fs-4">Search error, please try again later</p>
            </div>
          )}
          {loading && (
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

export default CompanySearchResults
