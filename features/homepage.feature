@home @retries:0
Feature: Playwright Home Page

  Scenario: Check title2
    Given I am on Playwright home page
    When I click link "Get started"
    Then I see in title "Installation1"

  Scenario: decorator page
    Given I am on todo page
    When I add todo "foo"
    And I add todo "bar"
    Then visible todos count is 2
