import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UCSBOrganizationForm from "main/components/UCSBOrganizations/UCSBOrganizationForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function UCSBOrganizationCreatePage({storybook=false}) {

    const objectToAxiosParams = (organizations) => ({
      url: "/api/UCSBOrganization/post",
      method: "POST",
      params: {
        orgCode: organizations.orgCode,
        orgTranslationShort: organizations.orgTranslationShort,
        orgTranslation: organizations.orgTranslation,
        inactive: organizations.inactive
      }
    });
 
    const onSuccess = (organizations) => {
      toast(`New UCSB Organization Created - orgCode: ${organizations.orgCode}`);
    }
 
    const mutation = useBackendMutation(
      objectToAxiosParams,
        { onSuccess }, 
        // Stryker disable next-line all : hard to set up test for caching
        ["/api/UCSBOrganization/all"] // mutation makes this key stale so that pages relying on it reload
    );
 
    const { isSuccess } = mutation
 
    const onSubmit = async (data) => {
      mutation.mutate(data);
    }
 
    if (isSuccess && !storybook) {
      return <Navigate to="/UCSBOrganization" />
    }
 
    // Stryker disable all : placeholder for future implementation
    return (
      <BasicLayout>
        <div className="pt-2">
          <h1>Create New Organization</h1>
          <UCSBOrganizationForm submitAction={onSubmit} />
        </div>
      </BasicLayout>
    )
  }
