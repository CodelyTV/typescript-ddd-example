Feature: Like a course
  In order to be able to like courses in the platform
  As a user
  I want to Like an existing course

  Scenario: A valid existing course
    Given a previous course has been already created
    Given I send a POST request to "/courses/ef8ac118-8d7f-49cc-abec-78e0d05af80b/like" with body:
    """
    {
      "userId": "ef8ac118-8d7f-49cc-abec-78e0d05af80a"      
    }
    """
    Then the response status code should be 204
    And the response should be empty

  Scenario: A not existing course
    Given I send a PUT request to "/courses/ef8ac118-8d7f-49cc-abec-78e0d05af80a/like" with body:
    """
    {
      "userId": "ef8ac118-8d7f-49cc-abec-78e0d05af80b"      
    }
    """
    Then the response status code should be 404
    And the response should be empty