@desktop
Feature: Playwright site

    @jira:123
    Scenario: Check title
        Given I open url "https://playwright.dev"
        When I click link "Get started"
        Then I see in title "Playwright"
        
   @jira:12
    Scenario: Check title1
        Given I open url "https://playwright.dev"
        When I click link "Get started"
        Then I see in title "Playwright"