import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { ucsbOrganizationsFixtures } from "fixtures/ucsbOrganizationFixture";
import OrganizationTable from "main/components/UCSBOrganizations/UCSBOrganizationTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

describe("OrganizationTable tests", () => {
  const queryClient = new QueryClient();

  const expectedHeaders = ["orgCode", "orgTranslationShort", "orgTranslation", "inactive"];
  const expectedFields = ["orgCode", "orgTranslationShort", "orgTranslation", "inactive"];
  const testId = "OrganizationTable";

  test("renders empty table correctly", () => {
    
    // arrange
    const currentUser = currentUserFixtures.adminUser;

    // act
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OrganizationTable organizations={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // assert
    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const fieldElement = screen.queryByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(fieldElement).not.toBeInTheDocument();
    });
  });

  test("Has the expected column headers, content and buttons for admin user", () => {
    // arrange
    const currentUser = currentUserFixtures.adminUser;

    // act
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OrganizationTable organizations={ucsbOrganizationsFixtures.threeOrganization} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // assert
    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(screen.getByTestId(`${testId}-cell-row-0-col-orgCode`)).toHaveTextContent(ucsbOrganizationsFixtures.threeOrganization[0].orgCode);
    expect(screen.getByTestId(`${testId}-cell-row-0-col-orgTranslationShort`)).toHaveTextContent(ucsbOrganizationsFixtures.threeOrganization[0].orgTranslationShort);
    expect(screen.getByTestId(`${testId}-cell-row-0-col-orgTranslation`)).toHaveTextContent(ucsbOrganizationsFixtures.threeOrganization[0].orgTranslationShort);
    //expect(screen.getByTestId(`${testId}-cell-row-0-col-inactive`)).toHaveTextContent(ucsbOrganizationsFixtures.threeOrganization[0].inactive);
    //This is the problem
    expect(screen.getByTestId(`${testId}-cell-row-1-col-orgCode`)).toHaveTextContent(ucsbOrganizationsFixtures.threeOrganization[1].orgCode);
    expect(screen.getByTestId(`${testId}-cell-row-1-col-orgTranslationShort`)).toHaveTextContent(ucsbOrganizationsFixtures.threeOrganization[1].orgTranslationShort);
    expect(screen.getByTestId(`${testId}-cell-row-1-col-orgTranslation`)).toHaveTextContent(ucsbOrganizationsFixtures.threeOrganization[1].orgTranslationShort);
    //expect(screen.getByTestId(`${testId}-cell-row-1-col-inactive`)).toHaveTextContent(ucsbOrganizationsFixtures.threeOrganization[1].inactive);
    //This is the problem
    const editButton = screen.getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveClass("btn-primary");

    const deleteButton = screen.getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveClass("btn-danger");

  });

  test("Has the expected column headers, content for ordinary user", () => {
    // arrange
    const currentUser = currentUserFixtures.userOnly;

    // act
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OrganizationTable organizations={ucsbOrganizationsFixtures.threeOrganization} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // assert
    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(screen.getByTestId(`${testId}-cell-row-0-col-orgCode`)).toHaveTextContent(ucsbOrganizationsFixtures.threeOrganization[0].orgCode);
    expect(screen.getByTestId(`${testId}-cell-row-0-col-orgTranslationShort`)).toHaveTextContent(ucsbOrganizationsFixtures.threeOrganization[0].orgTranslationShort);
    expect(screen.getByTestId(`${testId}-cell-row-0-col-orgTranslation`)).toHaveTextContent(ucsbOrganizationsFixtures.threeOrganization[0].orgTranslationShort);
    expect(screen.getByTestId(`${testId}-cell-row-0-col-inactive`)).toHaveTextContent(ucsbOrganizationsFixtures.threeOrganization[0].inactive);

    expect(screen.getByTestId(`${testId}-cell-row-1-col-orgCode`)).toHaveTextContent(ucsbOrganizationsFixtures.threeOrganization[1].orgCode);
    expect(screen.getByTestId(`${testId}-cell-row-1-col-orgTranslationShort`)).toHaveTextContent(ucsbOrganizationsFixtures.threeOrganization[1].orgTranslationShort);
    expect(screen.getByTestId(`${testId}-cell-row-1-col-orgTranslation`)).toHaveTextContent(ucsbOrganizationsFixtures.threeOrganization[1].orgTranslationShort);
    expect(screen.getByTestId(`${testId}-cell-row-1-col-inactive`)).toHaveTextContent(ucsbOrganizationsFixtures.threeOrganization[1].inactive);

    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  });


  test("Edit button navigates to the edit page", async () => {
    // arrange
    const currentUser = currentUserFixtures.adminUser;

    // act - render the component
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OrganizationTable organizations={ucsbOrganizationsFixtures.threeOrganization} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // assert - check that the expected content is rendered
    // expect(await screen.findByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2");
    // expect(screen.getByTestId(`${testId}-cell-row-0-col-name`)).toHaveTextContent("Cristino's Bakery");

    expect(screen.getByTestId(`${testId}-cell-row-0-col-orgCode`)).toHaveTextContent(ucsbOrganizationsFixtures.threeOrganization[0].orgCode);
    expect(screen.getByTestId(`${testId}-cell-row-0-col-orgTranslationShort`)).toHaveTextContent(ucsbOrganizationsFixtures.threeOrganization[0].orgTranslationShort);

    const editButton = screen.getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();

    // act - click the edit button
    fireEvent.click(editButton);
    console.log(ucsbOrganizationsFixtures.threeOrganization[0].orgCode)
    // assert - check that the navigate function was called with the expected path
    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/UCSBOrganization/edit/' + ucsbOrganizationsFixtures.threeOrganization[0].orgCode));

  });

  test("Delete button calls delete callback", async () => {
    // arrange
    const currentUser = currentUserFixtures.adminUser;

    // act - render the component
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OrganizationTable organizations={ucsbOrganizationsFixtures.threeOrganization} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // assert - check that the expected content is rendered
    // expect(await screen.findByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("2");
    // expect(screen.getByTestId(`${testId}-cell-row-0-col-name`)).toHaveTextContent("Cristino's Bakery");

    const deleteButton = screen.getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();

    // act - click the delete button
    fireEvent.click(deleteButton);
  });
});
