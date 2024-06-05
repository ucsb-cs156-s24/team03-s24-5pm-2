package edu.ucsb.cs156.example.web;

import edu.ucsb.cs156.example.WebTestCase;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("integration")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class HelpRequestWebIT extends WebTestCase {
    @Test
    public void admin_user_can_create_edit_delete_help_request() throws Exception {
        setupUser(true);

        page.getByText("Help Request").click();

        page.getByText("Create HelpRequest").click();
        assertThat(page.getByText("Create New HelpRequest")).isVisible();
        page.getByTestId("HelpRequestForm-requesterEmail").fill("adrumm@ucsb.edu");
        page.getByTestId("HelpRequestForm-teamId").fill("5pm-5");
        page.getByTestId("HelpRequestForm-tableOrBreakoutRoom").fill("table");
        page.getByTestId("HelpRequestForm-requestTime").click();
        page.keyboard().press("0");
        page.keyboard().press("1");
        page.keyboard().press("0");
        page.keyboard().press("3");
        page.keyboard().press("2");
        page.keyboard().press("0");
        page.keyboard().press("0");
        page.keyboard().press("3");

        page.keyboard().press("Tab");
        page.keyboard().press("1");
        page.keyboard().press("2");
        page.keyboard().press("0");
        page.keyboard().press("0");

        page.keyboard().press("A");
        
        page.getByTestId("HelpRequestForm-explanation").fill("helpReq");
        page.getByTestId("HelpRequestForm-solved").fill("true");
        page.getByTestId("HelpRequestForm-submit").click();

        assertThat(page.getByTestId("HelpRequestTable-cell-row-0-col-explanation"))
                .hasText("helpReq");

        page.getByTestId("HelpRequestTable-cell-row-0-col-Edit-button").click();
        assertThat(page.getByText("Edit HelpRequest")).isVisible();
        page.getByTestId("HelpRequestForm-explanation").fill("fixed");
        page.getByTestId("HelpRequestForm-submit").click();

        assertThat(page.getByTestId("HelpRequestTable-cell-row-0-col-explanation")).hasText("fixed");

        page.getByTestId("HelpRequestTable-cell-row-0-col-Delete-button").click();
        assertThat(page.getByTestId("HelpRequestForm-cell-row-0-col-requesterEmail")).not().isVisible();
    }

    @Test
    public void regular_user_cannot_create_help_request() throws Exception {
        setupUser(false);
        page.getByText("Help Request").click();

        assertThat(page.getByText("Create Help Request")).not().isVisible();
        assertThat(page.getByTestId("HelpRequestTable-cell-row-0-col-requesterEmail")).not().isVisible();
    }

}