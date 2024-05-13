import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import RecommendationRequestForm from "main/components/RecommendationRequest/RecommendationRequestForm";
import { Navigate } from 'react-router-dom'
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function RecommendationRequestEditPage({storybook=false}) {
  let { id } = useParams();

  const { data: rec, _error, _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/recomendationrequest?id=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/recommendationrequest`,
        params: {
          id
        }
      }
    );


  const objectToAxiosPutParams = (rec) => ({
    url: "/api/recommendationrequest",
    method: "PUT",
    params: {
      id: rec.id,
    },
    data: {
        requesterEmail: rec.requesterEmail,
        professorEmail: rec.professorEmail,
        explanation: rec.explanation,
        dateRequested: rec.dateRequested,
        dateNeeded: rec.dateNeeded,
        done: rec.done
    }
  });

  const onSuccess = (rec) => {
    toast(`RecommendationRequest Updated - id: ${rec.id} requesterEmail: ${rec.requesterEmail}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosPutParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [`/api/recommendationrequest?id=${id}`]
  );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess && !storybook) {
    return <Navigate to="/recommendationrequest" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Edit RecommendationRequest</h1>
        {
          rec && <RecommendationRequestForm initialContents={rec} submitAction={onSubmit} buttonLabel="Update" />
        }
      </div>
    </BasicLayout>
  )
}

