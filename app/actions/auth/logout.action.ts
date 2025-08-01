"use server"

import { removeToken, removeUserId } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const logoutAction = async() => {
    await removeToken();
    await removeUserId();
    redirect("/");
}

export default logoutAction