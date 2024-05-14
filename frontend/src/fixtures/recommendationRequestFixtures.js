const recommendationRequestFixtures = {
    oneRec: {
        "id": 1,
        "requesterEmail" : "jay@email.com",
        "professorEmail" : "preston@email.com",
        "explanation" : "Research Position Recommendation",
        "dateRequested" : "2022-01-02T12:00:00",
        "dateNeeded" : "2022-04-05T12:00:00",
        "done" : "true"
    },
    threeRecs: [
        {
            "id": 1,
            "requesterEmail" : "jay@email.com",
            "professorEmail" : "preston@email.com",
            "explanation" : "Research Position Recommendation",
            "dateRequested" : "2022-01-02T12:00:00",
            "dateNeeded" : "2022-04-05T12:00:00",
            "done" : "true"
        },
        {
            "id": 2,
            "requesterEmail" : "jenny@email.com",
            "professorEmail" : "praxton@email.com",
            "explanation" : "Building Change",
            "dateRequested" : "2024-02-03T12:00:00",
            "dateNeeded" : "2024-08-05T12:00:00",
            "done" : "false"
        },
        {
            "id": 3,
            "requesterEmail" : "eugene@email.com",
            "professorEmail" : "josh@email.com",
            "explanation" : "Transfer into College of Creative Studies",
            "dateRequested" : "2023-11-02T12:00:00",
            "dateNeeded" : "2023-12-20T12:00:00",
            "done" : "true"
        }
    ]
};


export { recommendationRequestFixtures };