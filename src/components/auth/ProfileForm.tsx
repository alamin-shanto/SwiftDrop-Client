import React from "react";
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useUpdateUserMutation } from "../../api/usersApi";
import { setAuth } from "../../features/auth/authSlice";
import { saveUser } from "../../lib/storage";
import { toast } from "react-toastify";

type FormValues = {
  name: string;
  email: string;
};

const ProfileForm: React.FC = () => {
  const user = useAppSelector((s) => s.auth.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { name: user?.name ?? "", email: user?.email ?? "" },
  });
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    reset({ name: user?.name ?? "", email: user?.email ?? "" });
  }, [user, reset]);

  const onSubmit = async (payload: FormValues) => {
    try {
      const updated = await updateUser({
        id: user!._id,
        body: payload,
      }).unwrap();
      dispatch(
        setAuth({
          token: (await Promise.resolve(
            localStorage.getItem("swiftdrop_token") || ""
          )) as any,
          user: updated,
        })
      ); // setAuth expects token + user; token preserved
      saveUser(updated);
      toast.success("Profile updated");
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-white dark:bg-slate-800 p-6 rounded shadow"
    >
      <h3 className="text-lg font-semibold mb-4">Profile</h3>

      <label className="block mb-3">
        <div className="text-sm mb-1">Full name</div>
        <input
          {...register("name", { required: "Name required" })}
          className="input"
        />
      </label>

      <label className="block mb-3">
        <div className="text-sm mb-1">Email</div>
        <input
          {...register("email", { required: "Email required" })}
          className="input"
        />
      </label>

      <div className="flex justify-end">
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
