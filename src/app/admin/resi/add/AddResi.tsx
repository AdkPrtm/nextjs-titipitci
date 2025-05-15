"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format, set } from "date-fns"
import { CalendarIcon, Link, Loader2 } from "lucide-react"
import { useForm, useFormContext } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
// import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Input from "@/components/form/input/InputField"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { useUserHook } from "@/hooks/useUserHook"
import ComponentCard from "@/components/common/ComponentCard"
import { useResiHook } from "@/hooks/useResiHook"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
    user_id: z.number({
        required_error: "Please select a user.",
    }).min(1, {
        message: "Please select a user.",
    }).positive(),

    nomor_resi: z.string({
        required_error: "Resi Number is required.",
    }).min(5, {
        message: "Resi Number must be at least 5 characters.",
    }),

    tanggal_diterima: z.date({
        required_error: "Received date is required.",
    }),

    posisi_paket: z.string({
        required_error: "Package position is required.",
    }).min(4, {
        message: "Package position must be at least 4 characters.",
    }),

    estimasi_tiba: z.date({
        required_error: "Estimated date is required.",
    }),

    status_paket: z.string({
        required_error: "Status Package is required.",
    }).min(8, {
        message: "Status Package must be at least 8 characters.",
    }),

    status_cod: z.boolean({
        required_error: "Status COD is required.",
    }),

    jumlah_cod: z.number({
        required_error: "Please enter a valid COD amount.",
    }).min(3, {
        message: "Please enter a valid COD amount.",
    }).positive().optional(),


    status_pembayaran_cod: z.string({
        required_error: "Please select a payment status.",
    }).optional(),

    method_pembayaran: z.string({
        required_error: "Please select a payment method.",
    }).optional(),

    tanggal_pembayaran: z.date({
        required_error: "Payment date is required.",
    }).optional(),
})

interface UserDataSelect {
    id: number
    name: string
}

export function AddResiForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    const router = useRouter()

    const isCod = form.watch('status_cod');

    const [filterUser, setFilterUser] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [isProgress, setIsProgress] = useState(false);
    const [actionType, setActionType] = useState<'createMore' | 'redirect' | null>(null);

    const { data, isLoading } = useUserHook({
        keyword: debouncedSearch,
        searching: Boolean(debouncedSearch !== ""),
    }).getFilterUser;

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(filterUser);
        }, 500);
        return () => clearTimeout(timer);
    }, [filterUser]);

    const { createResi } = useResiHook({});

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {

        try {
            setIsProgress(true);
            // await createResi.mutateAsync(data);  // Check if mutation was successful

            if (actionType === 'createMore') {
                form.reset();
                router.refresh();
            }

            if (actionType === 'redirect') {
                router.push('/admin/resi');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsProgress(false);
            setActionType(null);
        }
    };

    return (
        <ComponentCard title="Add Resi" >
            <Form {...form}>
                <form className="space-y-8 justify-end"
                    onSubmit={form.handleSubmit(onSubmit)} >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="user_id"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Name Receiver</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(Number(value))}
                                        defaultValue={String(field.value)}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a Name Receiver to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="w-full">
                                            <div className="p-2">
                                                <Input
                                                    placeholder="Search..."
                                                    onChange={(e) => setFilterUser(e.target.value)}
                                                    className="w-full p-2"
                                                />
                                            </div>
                                            {!isLoading && Array.isArray(data?.user) && data.user.map((user: UserDataSelect) => (
                                                <SelectItem key={user.id} value={user.id.toString()}>
                                                    {user.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                        <FormMessage />
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nomor_resi"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Resi Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="JTXXXXXX" {...field} defaultValue='' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="tanggal_diterima"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Receive Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "pl-3 text-left font-normal w-full",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="end">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date.getTime() > new Date().setDate(new Date().getDate() + 14) || date.getTime() < new Date().setDate(new Date().getDate() - 14)
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="posisi_paket"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Package Position</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="w-full">
                                            <SelectItem value="Balikpapan">Balikpapan</SelectItem>
                                            <SelectItem value="ITCI">ITCI</SelectItem>
                                        </SelectContent>
                                        <FormMessage />
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="estimasi_tiba"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Estimate Arriving Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="end">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date.getTime() > new Date().setDate(new Date().getDate() + 14) || date.getTime() < new Date().setDate(new Date().getDate() - 14)
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status_paket"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="w-full">Status Package</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="w-full">
                                            <SelectItem value="DIPROSES">DIPROSES</SelectItem>
                                            <SelectItem value="DITERIMA">DITERIMA</SelectItem>
                                        </SelectContent>
                                        <FormMessage />
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="status_cod"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="w-full">COD Status</FormLabel>
                                <Select onValueChange={(value) => field.onChange(value === 'true')}
                                    defaultValue={String(field.value)} >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a verified email to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="w-full">
                                        <SelectItem value="true">YA</SelectItem>
                                        <SelectItem value="false">TIDAK</SelectItem>
                                    </SelectContent>
                                    <FormMessage />
                                </Select>
                            </FormItem>
                        )}
                    />
                    {isCod === true && (
                        <>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="jumlah_cod"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Amount COD</FormLabel>
                                            <FormControl>
                                                <Input placeholder="shadcn" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status_pembayaran_cod"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>COD Payment Status</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a verified email to display" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="w-full">
                                                    <SelectItem value="BELUM_DIBAYAR">BELUM DIBAYAR</SelectItem>
                                                    <SelectItem value="SUDAH_DIBAYAR">SUDAH DIBAYAR</SelectItem>
                                                </SelectContent>
                                                <FormMessage />
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="method_pembayaran"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Payment Method</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a verified email to display" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="w-full">
                                                    <SelectItem value="CASH">CASH</SelectItem>
                                                    <SelectItem value="QRIS">QRIS</SelectItem>
                                                    <SelectItem value="TRANSFER">TRANSFER</SelectItem>
                                                </SelectContent>
                                                <FormMessage />
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="tanggal_pembayaran"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Payment Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="end">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date.getTime() > new Date().setDate(new Date().getDate() + 14) || date.getTime() < new Date().setDate(new Date().getDate() - 14)
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </>
                    )}

                    <div className="flex justify-end gap-4">
                        <Button variant="secondary" className="w-40" disabled={isProgress} type="submit" onClick={() => setActionType('createMore')}>
                            {isProgress ?
                                <Loader2 className="animate-spin" />
                                : "Submit & Create More"}
                        </Button>
                        <Button variant="default" className="w-40" disabled={isProgress} type="submit" onClick={() => setActionType('redirect')}>
                            {isProgress ?
                                <Loader2 className="animate-spin" />
                                : "Submit & Go to List"}
                        </Button>
                    </div>
                </form>
            </Form>
        </ComponentCard>
    )
}
