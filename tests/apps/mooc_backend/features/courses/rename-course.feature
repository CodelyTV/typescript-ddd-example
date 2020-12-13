Feature: Rename a new course
  In order to be able to rename courses in the platform
  As a user with admin permissions
  I want to rename an existing course

  Scenario: A valid existing course
    Given a previous course has been already created
    Given I send a PUT request to "/courses/ef8ac118-8d7f-49cc-abec-78e0d05af80b/rename" with body:
    """
    {
      "name": "New name course"      
    }
    """
    Then the response status code should be 204
    And the response should be empty

  Scenario: A not existing course
    Given I send a PUT request to "/courses/ef8ac118-8d7f-49cc-abec-78e0d05af80a/rename" with body:
    """
    {
      "name": "New name course"      
    }
    """
    Then the response status code should be 404
    And the response should be empty