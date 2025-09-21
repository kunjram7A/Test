'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { createListing, getListings, deleteListing, type CreateListingInput } from './actions';
import type { Listing, ListingCategory } from '@/lib/types';
import { PlusCircle, Loader2, Trash2, LogOut } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/use-auth';

const listingSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  category: z.enum(['accommodations', 'food', 'shops']),
  type: z.string().min(2, 'Type is required.'),
  rating: z.coerce.number().min(0).max(5),
  price: z.string().optional(),
  gender: z.enum(['', 'Boys', 'Girls', 'Co-ed']).optional(),
  imageHint: z.string().min(2, 'Image hint is required'),
});

type ListingFormValues = z.infer<typeof listingSchema>;

export default function AdminPageClient() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ListingCategory>('accommodations');
  
  const router = useRouter();
  const { toast } = useToast();
  
  useEffect(() => {
    // We only want to redirect if the auth check is complete and there's no user.
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);
  
  const fetchListings = async (category: ListingCategory) => {
    setIsLoading(true);
    try {
      const fetchedListings = await getListings(category);
      setListings(fetchedListings);
    } catch (error) {
      toast({ variant: 'destructive', title: "Error", description: 'Failed to fetch listings.' });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if(user) {
      fetchListings(selectedCategory);
    }
  }, [selectedCategory, user]);
  
  const handleDelete = async (id: string, category: ListingCategory) => {
    const result = await deleteListing(id, category);
    if (result.success) {
      toast({ title: "Listing deleted successfully!" });
      fetchListings(category); // Refetch the listings for the correct category
    } else {
      toast({ variant: 'destructive', title: "Error", description: result.error });
    }
  }

  const handleSignOut = async () => {
    await signOut(); // This now comes from the hook
    toast({ title: 'Signed out successfully.' });
    router.push('/login');
  };

  // Show a loading skeleton while the auth state is being determined
  if (authLoading || !user) {
    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10 md:p-6">
                <Skeleton className="h-8 w-48" />
                 <div className="md:hidden">
                    <SidebarTrigger />
                </div>
            </header>
            <main className="flex-1 p-4 md:p-6 overflow-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Skeleton className="h-8 w-64 mb-2" />
                        <Skeleton className="h-4 w-80" />
                    </div>
                    <Skeleton className="h-10 w-32" />
                </div>
                 <div className='flex gap-4'>
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i}>
                            <Skeleton className="w-full h-48" />
                            <CardContent className="p-4">
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-1/2" />
                            </CardContent>
                             <CardFooter className="p-4 pt-0">
                                <Skeleton className="h-8 w-1/4" />
                             </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10 md:p-6">
        <h1 className="text-xl md:text-2xl font-headline font-bold text-foreground">
          Admin Panel
        </h1>
        <div className='flex items-center gap-4'>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 overflow-auto">
         <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                <h2 className="text-2xl font-bold tracking-tight">Manage Listings</h2>
                <p className="text-muted-foreground">
                    Add, edit, or delete listings for your app.
                </p>
                </div>
                <NewListingDialog onListingCreated={() => fetchListings(selectedCategory)}>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Listing
                    </Button>
                </NewListingDialog>
            </div>

            <div className='flex gap-4'>
                <Button variant={selectedCategory === 'accommodations' ? 'default' : 'outline'} onClick={() => setSelectedCategory('accommodations')}>Accommodations</Button>
                <Button variant={selectedCategory === 'food' ? 'default' : 'outline'} onClick={() => setSelectedCategory('food')}>Food</Button>
                <Button variant={selectedCategory === 'shops' ? 'default' : 'outline'} onClick={() => setSelectedCategory('shops')}>Shops</Button>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {listings.map((listing) => (
                    <Card key={listing.id} className="overflow-hidden flex flex-col">
                    <CardHeader className="p-0">
                        <Image
                        src={listing.imageUrl}
                        alt={listing.title}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                        />
                    </CardHeader>
                    <CardContent className="p-4 flex-grow">
                        <CardTitle className="font-headline text-lg mb-2">{listing.title}</CardTitle>
                        <CardDescription className="flex gap-2 flex-wrap">
                            <Badge variant="secondary">{listing.type}</Badge>
                            {listing.gender && <Badge variant="outline">{listing.gender}</Badge>}
                        </CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        {listing.price && <p className="text-lg font-semibold text-primary">{listing.price}</p>}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the listing.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(listing.id, listing.category)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                    </Card>
                ))}
                </div>
            )}
            </div>
      </main>
    </div>
  );
}


function NewListingDialog({ children, onListingCreated }: { children: React.ReactNode, onListingCreated: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: '',
      category: 'accommodations',
      type: '',
      rating: 4.0,
      price: '',
      gender: '',
      imageHint: '',
    },
  });
  
  const category = form.watch('category');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDataUri(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: ListingFormValues) {
    setLoading(true);
    const input: CreateListingInput = {
      ...values,
      rating: Number(values.rating),
      imageDataUri,
      gender: values.gender || undefined,
    };

    const result = await createListing(input);
    
    if (result.success) {
      toast({ title: 'Listing created successfully!' });
      form.reset();
      setImageDataUri(null);
      onListingCreated();
      setIsOpen(false);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error creating listing',
        description: result.error,
      });
    }
    setLoading(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Listing</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="accommodations">Accommodations</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="shops">Shops</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Modern Student PG" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., PG, Restaurant, Stationery" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            {category === 'accommodations' && (
              <>
                 <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., ₹8,000/month" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>For</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Boys">Boys</SelectItem>
                          <SelectItem value="Girls">Girls</SelectItem>
                          <SelectItem value="Co-ed">Co-ed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                </FormControl>
                {imageDataUri && <Image src={imageDataUri} alt="preview" width={100} height={100} className='mt-2 rounded-md'/>}
                <FormMessage />
            </FormItem>

            <FormField
              control={form.control}
              name="imageHint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Hint</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., modern apartment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Listing
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
