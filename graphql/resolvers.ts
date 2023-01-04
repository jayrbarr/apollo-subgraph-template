const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const user = {
    token: 'Hello World'
}

// This resolver retrieves books from the "books" array above.
export default {
    Query: {
        user: () => "Hello World"
    }
};
