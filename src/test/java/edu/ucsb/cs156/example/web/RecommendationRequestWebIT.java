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
public class RecommendationRequestWebIT extends WebTestCase {
    @Test
    public void admin_user_can_create_edit_delete_recommendationRequest() throws Exception {
        setupUser(true);

        page.getByText("RecommendationRequest").click();

        page.getByText("Create RecommendationRequest").click();
        assertThat(page.getByText("Create New RecommendationRequest")).isVisible();
        page.getByTestId("RecommendationRequestForm-requesterEmail").fill("hallo@email.com");
        page.getByTestId("RecommendationRequestForm-professorEmail").fill("bod@email.com");
        page.getByTestId("RecommendationRequestForm-explanation").fill("copyright strike!");

        page.getByTestId("RecommendationRequestForm-dateRequested").click();
        //.fill("2022-01-03T00:00:00");
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
        
        page.getByTestId("RecommendationRequestForm-dateNeeded").click();
        //.fill("2022-01-03T00:00:00");
        // THIS IS FOR CHROME BASED APPLICATION
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

        page.getByTestId("RecommendationRequestForm-done").click();
        page.getByTestId("RecommendationRequestForm-submit").click();
                            
        assertThat(page.getByTestId("RecommendationRequestTable-cell-row-0-col-requesterEmail"))
                .hasText("hallo@email.com");

        page.getByTestId("RecommendationRequestTable-cell-row-0-col-Edit-button").click();
        assertThat(page.getByText("Edit RecommendationRequest")).isVisible();
        page.getByTestId("RecommendationRequestForm-requesterEmail").fill("rat@email.com");
        page.getByTestId("RecommendationRequestForm-submit").click();

        assertThat(page.getByTestId("RecommendationRequestTable-cell-row-0-col-requesterEmail")).hasText("rat@email.com");

        page.getByTestId("RecommendationRequestTable-cell-row-0-col-Delete-button").click();

        assertThat(page.getByTestId("RecommendationRequestTable-cell-row-0-col-name")).not().isVisible();
    }

    @Test
    public void regular_user_cannot_create_restaurant() throws Exception {
        setupUser(false);

        page.getByText("RecommendationRequest").click();

        assertThat(page.getByText("Create RecommendationRequest")).not().isVisible();
        assertThat(page.getByTestId("RecommendationRequestTable-cell-row-0-col-name")).not().isVisible();
    }
}