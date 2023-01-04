import { shield, rule, not, and, or } from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' })(async (_, __, { user }) => {
    return user !== null
})

const isAdmin = rule({ cache: 'contextual' })(async (_, __, { user }) => {
    return user.role === 'admin'
})

const isExpert = rule({ cache: 'contextual' })(async (_, __, { user }) => {
    return user.role === 'expert'
})

// Permissions
export default shield({
    Query: {
        login: not(isAuthenticated),
        user: isAuthenticated,
        bill: isAuthenticated
    },
    User: {
        socsec: isAdmin
    },
    Bill: {
        creditCard: or(isExpert, isAdmin)
    }
})