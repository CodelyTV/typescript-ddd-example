Feature: Obtain a list course
  In order to have a course info list
  As a user
  I want to see the courses

  Scenario: Retrieve a list of courses
    Given Previous courses has been already created 
    When I send a GET request to "/courses"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "data": [
        {
          "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80b",
          "duration": "1",
          "name": "Test Course!",
          "description": "Trust me, this is a test course"
        },
        {
          "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80c",
          "duration": "1",
          "name": "Test Course!",
          "description": "Trust me, this is a test course"
        }
      ]
    }
    """
  
  Scenario: Get an empty list
    When I send a GET request to "/courses"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "data": []
    }    
    """