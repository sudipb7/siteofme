"use client";

import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { useEditorStore, type SocialIcon } from "../../../lib/store";
import { SOCIAL_PLATFORMS, PLATFORM_ICONS } from "@/app/(main)/lib/constants";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SelectWithSearch, type SelectOption } from "@/components/ui/select-with-search";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlignCenter, AlignLeft, AlignRight, Plus, Trash2 } from "lucide-react";

const socialIconSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Please enter a valid URL"),
});

type SocialIconInput = z.infer<typeof socialIconSchema>;

export const SocialIconsSection = () => {
  const [open, setOpen] = useState(false);
  const { socialIcons, setSocialIcons, socialIconsAlignment, setSocialIconsAlignment } =
    useEditorStore();

  const form = useForm<SocialIconInput>({
    resolver: zodResolver(socialIconSchema),
    defaultValues: { platform: "", url: "" },
  });

  const handleAddSocialIcon = (data: SocialIconInput) => {
    const newIcon: SocialIcon = {
      id: uuidv4(),
      platform: data.platform,
      url: data.url,
    };
    setSocialIcons([...socialIcons, newIcon]);
    form.reset();
    setOpen(false);
  };

  const handleDeleteSocialIcon = (id: string) => {
    setSocialIcons(socialIcons.filter(icon => icon.id !== id));
  };

  const getPlatformIcon = (platform: string) => {
    const IconComponent = PLATFORM_ICONS[platform as keyof typeof PLATFORM_ICONS];
    return <IconComponent className="size-4" />;
  };

  const platformOptions: SelectOption[] = useMemo(
    () =>
      Object.entries(SOCIAL_PLATFORMS).map(([key, value]) => ({
        value: value,
        label: key
          .replaceAll("_", " ")
          .toLowerCase()
          .replace(/\b\w/g, l => l.toUpperCase()),
      })),
    []
  );

  return (
    <div className="space-y-2.5 border-b px-4 py-6">
      <div className="flex items-center justify-between">
        <h3 className="md:text-base text-lg font-semibold">Social Icons</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="gap-1.5">
              <Plus className="size-4" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="!max-w-md">
            <DialogHeader>
              <DialogTitle>Add Social Icon</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddSocialIcon)} className="space-y-4">
                <FormField
                  name="platform"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform</FormLabel>
                      <FormControl>
                        <SelectWithSearch
                          options={platformOptions}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select platform"
                          isModal={true}
                          searchPlaceholder="Search social platform"
                          emptyMessage="No social platform found."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="url"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" type="url" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="md:text-sm text-base font-medium">Position</span>
          <ToggleGroup
            type="single"
            value={socialIconsAlignment}
            onValueChange={value =>
              value && setSocialIconsAlignment(value as "left" | "center" | "right")
            }
          >
            <ToggleGroupItem
              value="left"
              aria-label="Align left"
              className="border bg-background hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground md:h-8 h-9 px-3"
            >
              <AlignLeft className="size-5 md:size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="center"
              aria-label="Align center"
              className="border-y bg-background hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground md:h-8 h-9 px-3"
            >
              <AlignCenter className="size-5 md:size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="right"
              aria-label="Align right"
              className="border bg-background hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground md:h-8 h-9 px-3"
            >
              <AlignRight className="size-5 md:size-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {socialIcons.length > 0 && (
          <div className="space-y-2">
            {socialIcons.map(icon => (
              <SocialIconItem
                key={icon.id}
                icon={icon}
                socialIcons={socialIcons}
                setSocialIcons={setSocialIcons}
                getPlatformIcon={getPlatformIcon}
                handleDeleteSocialIcon={handleDeleteSocialIcon}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const SocialIconItem = ({
  icon,
  getPlatformIcon,
  handleDeleteSocialIcon,
  setSocialIcons,
  socialIcons,
}: {
  icon: SocialIcon;
  socialIcons: SocialIcon[];
  getPlatformIcon: (platform: string) => React.JSX.Element;
  handleDeleteSocialIcon: (id: string) => void;
  setSocialIcons: (icons: SocialIcon[]) => void;
}) => {
  return (
    <div
      key={icon.id}
      className="flex items-center justify-between px-3 pr-1.5 py-1.5 rounded-lg border bg-background/50 gap-1 focus-within:ring-[1.5px] focus-within:ring-ring/50 focus-within:ring-offset-background focus-within:border-ring transition-all"
    >
      <div className="flex-1 flex items-center gap-2 text-sm font-medium">
        {getPlatformIcon(icon.platform)}
        <input
          className="h-full flex-1 outline-none"
          value={icon.url}
          onChange={e =>
            setSocialIcons(
              socialIcons.map(i => (i.id === icon.id ? { ...i, url: e.target.value } : i))
            )
          }
        />
      </div>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => handleDeleteSocialIcon(icon.id)}
        className="hover:bg-destructive/10 hover:text-destructive/70"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
};
