import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Google({
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	callbacks: {
		async signIn({ user }) {
			const allowedEmails = process.env.ALLOWED_EMAILS?.split(",") || [];

			if (!user.email || !allowedEmails.includes(user.email)) {
				return false; // Deny access
			}
			return true;
		},
	},
});
