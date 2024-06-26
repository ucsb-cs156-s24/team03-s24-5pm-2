import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function HelpRequestForm({ initialContents, submitAction, buttonLabel = "Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents || {}, }
    );
    // Stryker restore all

    const navigate = useNavigate();

    // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks

    // Stryker disable next-line Regex
    const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;

    // Stryker disable next-line all
    ///const yyyyq_regex = /((19)|(20))\d{2}[1-4]/i; // Accepts from 1900-2099 followed by 1-4.  Close enough.

    // Stryker disable next-line all
    //const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return (
        <Form onSubmit={handleSubmit(submitAction)}>
          <Row>
            {initialContents && (
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="id">Id</Form.Label>
                  <Form.Control
                    data-testid="HelpRequestForm-id"
                    id="id"
                    type="text"
                    {...register("id")}
                    value={initialContents.id}
                    disabled
                  />
                </Form.Group>
              </Col>
            )}
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="requesterEmail">requesterEmail</Form.Label>
                <Form.Control
                  data-testid="HelpRequestForm-requesterEmail"
                  id="requesterEmail"
                  type="text"
                  isInvalid={Boolean(errors.requesterEmail)}
                  {...register("requesterEmail", {
                    required: "requesterEmail is required.",
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.requesterEmail?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
    
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="teamId">teamId</Form.Label>
                <Form.Control
                  data-testid="HelpRequestForm-teamId"
                  id="teamId"
                  type="text"
                  isInvalid={Boolean(errors.teamId)}
                  {...register("teamId", {
                    required: "teamId is required.",
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.teamId?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
    
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="tableOrBreakoutRoom">
                  tableOrBreakoutRoom
                </Form.Label>
                <Form.Control
                  data-testid="HelpRequestForm-tableOrBreakoutRoom"
                  id="tableOrBreakoutRoom"
                  type="text"
                  isInvalid={Boolean(errors.tableOrBreakoutRoom)}
                  {...register("tableOrBreakoutRoom", {
                    required: "tableOrBreakoutRoom is required.",
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.tableOrBreakoutRoom?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
    
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="requestTime">
                  requestTime (iso format)
                </Form.Label>
                <Form.Control
                  data-testid="HelpRequestForm-requestTime"
                  id="requestTime"
                  type="datetime-local"
                  isInvalid={Boolean(errors.requestTime)}
                                {...register("requestTime", { required: true, pattern: isodate_regex })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.requestTime && "requestTime is required. "}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
    
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="explanation">explanation</Form.Label>
                <Form.Control
                  data-testid="HelpRequestForm-explanation"
                  id="explanation"
                  type="text"
                  isInvalid={Boolean(errors.explanation)}
                  {...register("explanation", {
                    required: "explanation is required.",
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.explanation?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
    
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="solved">solved</Form.Label>
                <Form.Control
                  data-testid="HelpRequestForm-solved"
                  id="solved"
                  type="text"
                  isInvalid={Boolean(errors.solved)}
                  {...register("solved", {
                    required: "solved is required.",
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.solved?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
    
            <Row>
                <Col>
                    <Button
                        type="submit"
                        data-testid="HelpRequestForm-submit"
                    >
                        {buttonLabel}
                    </Button>
                    <Button
                        variant="Secondary"
                        onClick={() => navigate(-1)}
                        data-testid="HelpRequestForm-cancel"
                    >
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Form>

    )
}

export default HelpRequestForm;
