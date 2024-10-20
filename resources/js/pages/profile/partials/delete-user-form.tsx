import { FormEventHandler, useRef, useState } from "react";
import { InputError } from "@/components/ui/input-error";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/alert-dialog";

export default function DeleteUserForm({
    className = "",
}: {
    className?: string;
}) {
    const [open, setOpen] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <AlertDialog open={open}>
                <AlertDialogTrigger asChild>
                    <Button
                        onClick={() => setOpen(true)}
                        variant={"destructive"}
                    >
                        Delete Account
                    </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                    <form onSubmit={deleteUser}>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you sure you want to delete your account?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Once your account is deleted, all of its
                                resources and data will be permanently deleted.
                                Please enter your password to confirm you would
                                like to permanently delete your account.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <div className="py-4">
                            <Label htmlFor="password" className="sr-only">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="Password"
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setOpen(false)}>
                                Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction
                                type={"submit"}
                                variant={"destructive"}
                                disabled={processing}
                            >
                                Delete Account
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
}
