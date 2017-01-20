export const normalizedState = {
    user: {
        "58813e4bad8a3da595c1a0c1": {
            __v: 5,
            _id: "58813e4bad8a3da595c1a0c1",
            buddy: null,
            email: "doug@aol.com",
            histories: ["58813e59ad8a3da595c1a0c3"],
            name: "Doug",
            password: "$2a$10$y95qfPNDK0Vlzhk4fmVsveVAEvCAVZp/reGpBWuPH4ds1CKpZiIX."            
        }
    },
    history: {
        "58813e59ad8a3da595c1a0c3": {
            _id: "58813e59ad8a3da595c1a0c3",
            date: "2017-01-20T08:00:00.000Z",
            tasks: ["58813e67ad8a3da595c1a0c4"]
        }
    },
    task: {
        "58813e67ad8a3da595c1a0c4": {
            _id: "58813e67ad8a3da595c1a0c4",
            color: "orange",
            goals: ["58813e67ad8a3da595c1a0c7", "58813e67ad8a3da595c1a0c6", "58813e67ad8a3da595c1a0c5"],
            name: "Meditation",
            timestamps: ["58814076ad8a3da595c1a0c9"],
            type: "time"
        }
    },
    goal: {
        "58813e67ad8a3da595c1a0c5": {
            _id : "58813e67ad8a3da595c1a0c5",
            count : 0,
            goal : 22260,
            interval : "monthly",
            lastAssessed : null,
            nextAssessed : "2017-02-01T08:00:00.000Z",
            originalMultiplier: 0.3702508960573477,
            streak: 0
        }
    },
    timestamp: {
        "58814076ad8a3da595c1a0c9": {
            _id: "58814076ad8a3da595c1a0c9",
            end: "2017-01-19T22:40:57.536Z",
            start: "2017-01-19T22:40:54.326Z"
        }
    },
    calendar: {
        loading: false,
        weekIdx: 0
    }
};

export const denormalizedState = {
    user: {
        __v: 5,
        _id: "58813e4bad8a3da595c1a0c1",
        buddy: null,
        email: "doug@aol.com",
        name: "Doug",
        password: "$2a$10$y95qfPNDK0Vlzhk4fmVsveVAEvCAVZp/reGpBWuPH4ds1CKpZiIX.",
        histories: [{
            _id: "58813e59ad8a3da595c1a0c3",
            date: "2017-01-20T08:00:00.000Z",
            tasks: [{
                _id: "58813e67ad8a3da595c1a0c4",
                color: "orange",
                goals: [{
                    _id : "58813e67ad8a3da595c1a0c5",
                    count : 0,
                    goal : 22260,
                    interval : "monthly",
                    lastAssessed : null,
                    nextAssessed : "2017-02-01T08:00:00.000Z",
                    originalMultiplier: 0.3702508960573477,
                    streak: 0
                }],
                name: "Meditation",
                timestamps: [{
                    _id: "58814076ad8a3da595c1a0c9",
                    end: "2017-01-19T01:05:00.000",
                    start: "2017-01-19T01:00:00.000"                       
                }],
                type: "time"
            }]
        }]
    },
    calendar: {
        loading: false,
        weekIdx: 0
    }
};