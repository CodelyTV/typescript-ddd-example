Feature: Create a new course
  In order to have courses in the platform
  As a user with admin permissions
  I want to create a new course

  Scenario: A valid unexisting course
    Given I send a PUT request to "/courses/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "name": "The best course",
      "duration": "5 hours"
    }
    """
    Then the response status code should be 201
    And the response should be empty
