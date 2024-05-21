package edu.ucsb.cs156.example.web;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

import edu.ucsb.cs156.example.WebTestCase;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("integration")
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)

public class UCSBOrganizationWebIT extends WebTestCase {
    @Test
    public void admin_user_can_create_edit_delete_ucsborganization() throws Exception {
        setupUser(true);

        page.getByText("UCSB Organization").click();
        assertThat(page.getByText("Create UCSBOrganization")).isVisible();
        page.getByText("Create UCSBOrganization").click();
        
        page.getByTestId("OrganizationForm-orgCode").fill("KRC");
        page.getByTestId("OrganizationForm-orgTranslationShort").fill("Korean Radio Cl");
        page.getByTestId("OrganizationForm-orgTranslation").fill("Korean Radio Club");
        page.getByTestId("OrganizationForm-inactive").selectOption("true");
        page.getByTestId("OrganizationForm-submit").click();

        assertThat(page.getByTestId("OrganizationTable-cell-row-0-col-orgTranslationShort")).hasText("Korean Radio Cl");
        assertThat(page.getByTestId("OrganizationTable-cell-row-0-col-orgTranslation")).hasText("Korean Radio Club");

        page.getByTestId("OrganizationTable-cell-row-0-col-Edit-button").click();
        assertThat(page.getByText("Edit")).isVisible();
        page.getByTestId("OrganizationForm-orgTranslationShort").fill("Test");
        page.getByTestId("OrganizationForm-orgTranslation").fill("Tester");
        page.getByTestId("OrganizationForm-inactive").selectOption("false");
        page.getByTestId("OrganizationForm-submit").click();

        assertThat(page.getByTestId("OrganizationTable-cell-row-0-col-orgTranslationShort")).hasText("Test");
        assertThat(page.getByTestId("OrganizationTable-cell-row-0-col-orgTranslation")).hasText("Tester");
        assertThat(page.getByTestId("OrganizationTable-cell-row-0-col-inactive")).hasText("false");

        page.getByTestId("OrganizationTable-cell-row-0-col-Delete-button").click();

        assertThat(page.getByTestId("OrganizationTable-cell-row-0-col-orgCode")).not().isVisible();
    }

    @Test
    public void regular_user_cannot_create_ucsborganization() throws Exception {
        setupUser(false);

        page.getByText("UCSB Organization").click();

        assertThat(page.getByText("Create UCSBOrganization")).not().isVisible();
        assertThat(page.getByTestId("OrganizationTable-cell-row-0-col-orgCode")).not().isVisible();
    }
}