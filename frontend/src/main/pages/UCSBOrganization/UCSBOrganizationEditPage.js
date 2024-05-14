import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import OrganizationForm from 'main/components/UCSBOrganizations/UCSBOrganizationForm';
import { Navigate } from 'react-router-dom';
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function UCSBOrganizationEditPage({storybook=false}) {
    let { id } = useParams();

    const { data: organizations, _error, _status } =
        useBackend(
            // Stryker disable next-line all : don't test internal caching of React Query
            [`/api/UCSBOrganization?orgCode=${id}`],
            {  // Stryker disable next-line all : GET is the default, so mutating this to "" doesn't introduce a bug
                method: "GET",
                url: `/api/UCSBOrganization`,
                params: {
                    orgCode:id
                }
            }
        );

    const objectToAxiosPutParams = (organizations) => ({
        url: "/api/UCSBOrganization",
        method: "PUT",
        params: {
            orgCode: organizations.orgCode,
        },
        data: {
          orgCode: organizations.orgCode,
          orgTranslationShort: organizations.orgTranslationShort,
          orgTranslation: organizations.orgTranslation,
          inactive: organizations.inactive,
        }
    });

    const onSuccess = (organizations) => {
        toast(`UCSB Organization Updated - orgCode: ${organizations.orgCode}`);
    }

    const mutation = useBackendMutation(
        objectToAxiosPutParams,
        { onSuccess },
        // Stryker disable next-line all : hard to set up test for caching
        [`/api/UCSBOrganization?orgCode=${id}`]
    );

    const { isSuccess } = mutation

    const onSubmit = async (data) => {
        mutation.mutate(data);
    }

    if (isSuccess && !storybook) {
        return <Navigate to="/UCSBOrganization" />
    }

    return (
        <BasicLayout>
            <div className="pt-2">
                <h1>Edit UCSB Organization</h1>
                {
                    organizations && <OrganizationForm submitAction={onSubmit} buttonLabel={"Update"} initialContents={organizations} />
                }
            </div>
        </BasicLayout>
    )

}