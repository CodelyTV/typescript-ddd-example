Feature: Get courses
  As a user with permissions
  I want to get courses

  Scenario: All existing courses
    Given the following event is received:
    """
    {
      "data": {
        "id": "c77fa036-cbc7-4414-996b-c6a7a93cae09",
        "type": "course.created",
        "occurred_on": "2019-08-08T08:37:32+00:00",
        "aggregateId": "8c900b20-e04a-4777-9183-32faab6d2fb5",
        "attributes": {
          "name": "DDD en PHP!",
          "duration": "25 hours"
        },
        "meta" : {
          "host": "111.26.06.93"
        }
      }
    }
    """
    And the following event is received:
    """
        {
      "data": {
        "id": "353baf48-56e4-4eb2-91a0-b8f826135e6a",
        "type": "course.created",
        "occurred_on": "2019-08-08T08:37:32+00:00",
        "aggregateId": "8c4a4ed8-9458-489e-a167-b099d81fa096",
        "attributes": {
            "name": "DDD en Java!",
            "duration": "24 hours"
        },
        "meta" : {
          "host": "111.26.06.93"
        }
      }
    }
    """
    And I send a GET request to "/courses"
    Then the response status code should be 200
    And the response should be:
    """
    [
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
    """
