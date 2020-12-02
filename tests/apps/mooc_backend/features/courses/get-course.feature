Feature: Obtain the total number of courses
  In order to have a course info
  As a user
  I want to see the courses

  # Scenario: Retrieve a course
  #   When I send a GET request to "/courses/ef8ac118-8d7f-49cc-abec-78e0d05af80b"
  #   Then the response status code should be 200
  #   And the response content should be:
  #   """
  #   {
  #     "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80b",
  #     "duration": "1",
  #     "name": "Test Course!"
  #   }
  #   """
  
  Scenario: Get a Not found Exception
    When I send a GET request to "/courses/ef8ac118-8d7f-49cc-abec-78e0d05af80c"
    Then the response status code should be 404
    And the response should be empty