import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import UCSBOrganizationEditPage from "main/pages/UCSBOrganization/UCSBOrganizationEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import mockConsole from "jest-mock-console";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({
            id: 17
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("UCSBOrganizationEditPageEditPage tests", () => {

    describe("when the backend doesn't return data", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            // axiosMock.onGet("/api/UCSBOrganization", { params: { orgCode: "KRC" } }).timeout();
            //this maybe ?
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {

            const restoreConsole = mockConsole();

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <UCSBOrganizationEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await screen.findByText("Edit UCSB Organization");
            expect(screen.queryByTestId("UCSBOrganization-name")).not.toBeInTheDocument();
            //wait here 
            restoreConsole();
        });
    });

    describe("tests where backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/UCSBOrganization", { params: { orgCode: "KRC" } }).reply(200, {
                orgCode: "KRC",
                orgTranslationShort: "KOREAN RADIO CL",
                orgTranslation: "KOREAN RADIO CLUB",
                inactive: "false"
            });
            axiosMock.onPut('/api/UCSBOrganization').reply(200, {
                orgCode: "KRC",
                orgTranslationShort: "Cooling",
                orgTranslation: "Coolest",
                inactive: "false"
            });
        });

        const queryClient = new QueryClient();
    
        test("Is populated with the data provided", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <UCSBOrganizationEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await screen.findByTestId("OrganizationForm-orgCode");

            const orgCodeField = screen.getByTestId("OrganizationForm-orgCode");
            const orgTranslationShortField = screen.getByTestId("OrganizationForm-orgTranslationShort");
            const orgTranslationField = screen.getByTestId("OrganizationForm-orgTranslation");
            const isActiveField = screen.getByTestId("OrganizationForm-inactive");
            const submitButton = screen.getByTestId("OrganizationForm-submit");

            expect(orgCodeField).toBeInTheDocument();
            expect(orgCodeField).toHaveValue("KRC");
            expect(orgTranslationShortField).toBeInTheDocument();
            expect(orgTranslationShortField).toHaveValue("Cool");
            expect(orgTranslationField).toBeInTheDocument();
            expect(orgTranslationField).toHaveValue("Cooler");
            expect(isActiveField).toBeInTheDocument();
            expect(isActiveField).toHaveValue("false");

            expect(submitButton).toHaveTextContent("Update");

            fireEvent.change(orgTranslationShortField, { target: { value: 'Cooling' } });
            fireEvent.change(orgTranslationField, { target: { value: 'Coolest' } });
            fireEvent.change(isActiveField, { target: { value: 'true' } });
            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled());
            expect(mockToast).toBeCalledWith("UCSB Organization Updated - orgCode: KRC");
            
            expect(mockNavigate).toBeCalledWith({ "to": "/UCSBOrganization" });

            expect(axiosMock.history.put.length).toBe(1); // times called
             expect(axiosMock.history.put[0].params).toEqual({ orgCode: "KRC"});
             expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                 orgCode: 'KRC',
                 orgTranslationShort: 'Cooling',
                 orgTranslation: 'Coolest',
                 inactive: 'true'
             })); // posted object


        });

        test("Changes when you click Update", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <UCSBOrganizationEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            

            await screen.findByTestId("OrganizationForm-orgCode");

             const orgCodeField = screen.getByTestId("OrganizationForm-orgCode");
             const orgTranslationShortField = screen.getByTestId("OrganizationForm-orgTranslationShort");
             const orgTranslationField = screen.getByTestId("OrganizationForm-orgTranslation");
             const isActiveField = screen.getByTestId("OrganizationForm-inactive");
             const submitButton = screen.getByTestId("OrganizationForm-submit");

            expect(orgCodeField).toHaveValue("KRC");
            expect(orgTranslationShortField).toHaveValue("Cool");
            expect(orgTranslationField).toHaveValue("Cooler");
            expect(isActiveField).toHaveValue("false");

            fireEvent.change(orgTranslationShortField, { target: { value: 'Cooling' } });
            fireEvent.change(orgTranslationField, { target: { value: 'Coolest' } });

            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled());
            expect(mockToast).toBeCalledWith("UCSB Organization Updated - orgCode: KRC");
             expect(mockNavigate).toBeCalledWith({ "to": "/UCSBOrganization" });
        });

       
    });
});
