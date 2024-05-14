const menuItemReviewFixtures = {
    oneReview: {
        "id": 1,
        "itemId": 8,
        "reviewerEmail": "emailone@gmail.com",
        "stars": 5,
        "dateReviewed": "2021-01-02T11:00:00",
        "comments": "Great!"
    },
    threeReviews: [
        {
            "id": 1,
            "itemId": 8,
            "reviewerEmail": "emailone@gmail.com",
            "stars": 5,
            "dateReviewed": "2021-01-02T11:00:00",
            "comments": "Great!"
        },
        {
            "id": 2,
            "itemId": 9,
            "reviewerEmail": "emailtwo@gmail.com",
            "stars": 3,
            "dateReviewed": "2022-02-02T12:00:00",
            "comments": "Meh."
        },
        {
            "id": 3,
            "itemId": 10,
            "reviewerEmail": "emailthree@gmail.com",
            "stars": 1,
            "dateReviewed": "2023-03-02T13:00:00",
            "comments": "Bad..."
        }
    ]
};

export { menuItemReviewFixtures };