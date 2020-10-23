Feature: Get courses
  As a user with permissions
  I want to get courses

  Scenario: All existing courses
    Given I send a GET request to "/courses"
    And there is the course:
    """
    {
        "id": "8c900b20-e04a-4777-9183-32faab6d2fb5",
        "name": "DDD en PHP!",
        "duration": "25 hours"
    }
    """
    And there is the course:
    """
    {
        "id": "8c4a4ed8-9458-489e-a167-b099d81fa096",
        "name": "DDD en Java!",
        "duration": "24 hours"
    }
    """
    # Then the response status code should be 200
    And the response should be:
    """
    {
        "courses": [
            {
                "id": "8c900b20-e04a-4777-9183-32faab6d2fb5",
                "name": "DDD en PHP!",
                "duration": "25 hours"
            },
            {
                "id": "8c4a4ed8-9458-489e-a167-b099d81fa096",
                "name": "DDD en Java!",
                "duration": "24 hours"
            }
        ]
    }
    """
