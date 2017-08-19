var Model = {
    domains: [
        {
            id: 0,
            domain_name: "www.example.com",
            grade: "A+",
            last_updated: 1490918500000,
            status: "OK",
            active: true
        },
        {
            id: 1,
            domain_name: "www.example_two.com",
            grade: "B",
            last_updated: 1499919200000,
            status: "OK",
            active: true
        },
        {
            id: 2,
            domain_name: "www.example_three.com",
            grade: "N/A",
            last_updated: 1491918400000,
            status: "Error",
            active: true
        },
        {
            id: 3,
            domain_name: "www.example_four.com",
            grade: "F",
            last_updated: 1390518400000,
            status: "OK",
            active: true
        },
        {
            id: 4,
            domain_name: "www.example_disabled.com",
            grade: "F",
            last_updated: 1480918400000,
            status: "OK",
            active: false
        }
    ],

    pages: ["SSL Status", "Settings"],

    currentPage: null

};