'use server';

import { revalidatePath } from 'next/cache';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
import type { Listing, ListingCategory } from '@/lib/types';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { cookies } from 'next/headers';
import { accommodationListings, foodListings, shopListings } from '@/lib/data';

export async function getListings(
  category: ListingCategory
): Promise<Listing[]> {
  // This is a temporary solution to show demo data.
  // In a real app, you would fetch this from Firestore.
  if (category === 'accommodations' && accommodationListings.length > 0) {
    return accommodationListings;
  }
  if (category === 'food' && foodListings.length > 0) {
    return foodListings;
  }
  if (category === 'shops' && shopListings.length > 0) {
    return shopListings;
  }

  try {
    const querySnapshot = await getDocs(collection(db, category));
    const listings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Listing[];
    return listings;
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}

export type CreateListingInput = Omit<Listing, 'id' | 'imageUrl'> & {
  imageDataUri: string | null;
};

// Helper function to check auth
async function isAuthenticated() {
    const authCookie = cookies().get('kickstartu-auth');
    if (!authCookie) return false;

    try {
        const user = JSON.parse(authCookie.value);
        // A simple check to see if the user object has an email
        return !!user.email;
    } catch {
        return false;
    }
}


export async function createListing(
  input: CreateListingInput
): Promise<{ success: boolean; error?: string }> {
  const authed = await isAuthenticated();
  if (!authed) {
    return { success: false, error: 'Authentication required.' };
  }

  try {
    const { category, imageDataUri, ...listingData } = input;
    let imageUrl = 'https://picsum.photos/seed/placeholder/600/400';

    if (imageDataUri) {
      const storageRef = ref(storage, `${category}/${Date.now()}`);
      await uploadString(storageRef, imageDataUri, 'data_url');
      imageUrl = await getDownloadURL(storageRef);
    }
    
    await addDoc(collection(db, category), { ...listingData, imageUrl });

    revalidatePath('/admin');
    revalidatePath(`/${category}`);
    return { success: true };
  } catch (error) {
    console.error('Error creating listing:', error);
    return { success: false, error: 'Failed to create listing.' };
  }
}

export async function deleteListing(id: string, category: ListingCategory) {
    const authed = await isAuthenticated();
    if (!authed) {
        return { success: false, error: 'Authentication required.' };
    }

    try {
        await deleteDoc(doc(db, category, id));
        revalidatePath('/admin');
        revalidatePath(`/${category}`);
        return { success: true };
    } catch (error) {
        console.error('Error deleting listing:', error);
        return { success: false, error: 'Failed to delete listing.' };
    }
}
