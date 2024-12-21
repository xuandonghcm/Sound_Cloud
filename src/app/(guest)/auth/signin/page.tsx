
import SignInComponent from '@/components/screen/auth/SignIn';
import * as React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { PATH } from '@/constants/PathConstants';
import { getProviders } from "next-auth/react";
import { redirect } from 'next/navigation';
export default async function AuthSignPage() {

    const session = await getServerSession(authOptions);
    if (session) {
        redirect(PATH.BLANK)
    }
    const providers = await getProviders();
    return (
        <SignInComponent />
    );
}
