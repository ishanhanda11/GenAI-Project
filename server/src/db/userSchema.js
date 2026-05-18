const { z } = require('zod')

const userSchema = z.object({
    username: z.string().trim().min(3, "Name must be at least 3 characters").max(20, "Name cannot exceed 20 characters"),
    email: z.string().trim().toLowerCase().email("Invalid email"),
    password: z.string().min(8, "password must be atleast 8 characters").max(14, "password cannot be greater than 14 characters")
})
const userSchemaLogin = userSchema.pick({
    email: true,
    password: true
})
module.exports = {userSchema, userSchemaLogin}