import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import OrganizationForm from "main/components/UCSBOrganizations/UCSBOrganizationForm";
import { ucsbOrganizationsFixtures } from "fixtures/ucsbOrganizationFixture";

import { QueryClient, QueryClientProvider } from "react-query";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("OrganizationForm tests", () => {
    const queryClient = new QueryClient();

    const expectedHeaders = ["orgCode","orgTranslationShort","orgTranslation", "inactive"];
    const testId = "OrganizationForm";

    test("renders correctly with no initialContents", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <OrganizationForm />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Create/)).toBeInTheDocument();

        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
        });

    });

    test("renders correctly when passing in initialContents", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <OrganizationForm initialContents={ucsbOrganizationsFixtures.oneOrganization} />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Create/)).toBeInTheDocument();

         expectedHeaders.forEach((headerText) => {
             const header = screen.getByText(headerText);
             expect(header).toBeInTheDocument();
         });

         expect(await screen.findByTestId(`${testId}-orgCode`)).toBeInTheDocument();
         expect(screen.getByText(`orgCode`)).toBeInTheDocument();
         expect(screen.getByTestId(`${testId}-orgCode`)).toHaveValue("KRC");

         expect(await screen.findByTestId(`${testId}-orgTranslationShort`)).toBeInTheDocument();
         expect(screen.getByText(`orgTranslationShort`)).toBeInTheDocument();
         expect(screen.getByTestId(`${testId}-orgTranslationShort`)).toHaveValue("KOREAN RADIO CL");

         expect(await screen.findByTestId(`${testId}-orgTranslation`)).toBeInTheDocument();
         expect(screen.getByText(`orgTranslation`)).toBeInTheDocument();
         expect(screen.getByTestId(`${testId}-orgTranslation`)).toHaveValue("KOREAN RADIO CLUB");

         expect(await screen.findByTestId(`${testId}-inactive`)).toBeInTheDocument();
         expect(screen.getByText(`inactive`)).toBeInTheDocument();
         expect(screen.getByTestId(`${testId}-inactive`)).toHaveValue("false");
    });


    test("that navigate(-1) is called when Cancel is clicked", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <OrganizationForm />
                </Router>
            </QueryClientProvider>
        );
        expect(await screen.findByTestId(`${testId}-cancel`)).toBeInTheDocument();
        const cancelButton = screen.getByTestId(`${testId}-cancel`);

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
    });

    test("that the correct validations are performed", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <OrganizationForm />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Create/)).toBeInTheDocument();
        const submitButton = screen.getByText(/Create/);
        fireEvent.click(submitButton);

        //await expect(screen.getByText(/orgCode is required./)).toBeInTheDocument();
        await screen.findByText(/orgCode is required/);
        expect(screen.getByText(/orgTranslationShort is required./)).toBeInTheDocument();
        expect(screen.getByText(/orgTranslation is required./)).toBeInTheDocument();
        //expect(screen.getByText(/inactive is required./)).toBeInTheDocument();

        const nameInput = screen.getByTestId(`${testId}-orgCode`);
        const orgTranslationInput = screen.getByTestId(`${testId}-orgTranslation`);
        const orgTranslationShortInput = screen.getByTestId(`${testId}-orgTranslationShort`);
        const inactiveInput = screen.getByTestId(`${testId}-inactive`);
        const submitInput = screen.getByTestId(`${testId}-submit`);
        fireEvent.change(nameInput, { target: { value: ""} });
        fireEvent.change(orgTranslationInput, { target: { value: ""} });
        fireEvent.change(orgTranslationShortInput, { target: { value: ""} });
        fireEvent.change(inactiveInput, { target: { value: ""} });
        fireEvent.change(submitInput, { target: { value: ""} });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/orgCode is required./)).toBeInTheDocument();
        }
        );
    });

});