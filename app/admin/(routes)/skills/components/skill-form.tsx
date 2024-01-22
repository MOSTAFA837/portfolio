"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Skill } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/ui/aler-modal";
import { ImageUpload } from "@/components/ui/image-upload";

interface Props {
  initialData: Skill | null;
}

const formSchema = z.object({
  name: z.string().min(2),
  imageUrl: z.string().min(2),
});

type SkillFormValues = z.infer<typeof formSchema>;

export const SkillForm: React.FC<Props> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit skill" : "Create skill";
  const description = initialData
    ? "Edit a skill."
    : "Add a new skill successfully.";
  const toastMessage = initialData
    ? "skill updated successfully."
    : "skill created successfully.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: SkillFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data
        );
      } else {
        // console.log(data);
        await axios.post(`/api/skills`, data);
      }

      router.refresh();
      router.push(`/admin/skills`);
      toast.success(toastMessage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`
      );
      router.refresh();
      router.push("/");
      toast.success("category deleted successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            className=" flex items-center"
            variant="destructive"
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>

                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="category name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
