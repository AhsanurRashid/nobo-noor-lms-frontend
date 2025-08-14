"use server"

import { removeToken, removeUserId } from "@/lib/auth";
import { redirect } from "next/navigation";

const logoutAction = async() => {
    await removeToken();
    await removeUserId();
    redirect("/");
}

export default logoutAction