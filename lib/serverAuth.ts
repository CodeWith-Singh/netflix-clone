import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prismadb from '@/lib/prismadb';


const serverAuth = async (req: NextApiRequest) => {
    const session = await getSession({req});

    console.log("Session: " + session);

    if (!session?.user?.email) {
        throw new Error("Not Signed in")
    }

    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    console.log("Current User session: " + currentUser);

    if (!currentUser) {
        throw new Error("Not Signed In");
    }

    return {currentUser}
}

export default serverAuth;