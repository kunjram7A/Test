'use server';

import { revalidatePath } from 'next/cache';

// This is a simplified, non-Firebase sign-in for demonstration.
export async function signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  if (email === 'kunjagnihotri1@gmail.com' && password === 'kunjram@7') {
    revalidatePath('/admin');
    return { success: true };
  } else {
    return { success: false, error: 'Please enter correct id and password.' };
  }
}

// This is a simplified, non-Firebase sign-out.
export async function signOut(): Promise<{ success: boolean; error?: string }> {
    revalidatePath('/login');
    revalidatePath('/admin');
    return { success: true };
}
