'use client';

import React from 'react';
import { FaXTwitter, FaGithub } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import noteIcon from '~/assets/note.svg?url';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';

const contactFormSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  message: z.string().min(1, 'メッセージを入力してください'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactDialog: React.FC<ContactDialogProps> = ({ open, onOpenChange }) => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const handleSubmit = (data: ContactFormValues) => {
    console.log('Contact form submitted:', data);
    alert('お問い合わせありがとうございます！');
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#101010] main-fg border-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center font-eurostile">Contact Me</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-6">
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://twitter.com/kz25_kmc/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70"
            >
              <FaXTwitter className="text-3xl" />
            </a>
            <a
              href="https://github.com/tarabakz25/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70"
            >
              <FaGithub className="text-3xl" />
            </a>
            <a
              href="https://note.com/kz25_01"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70"
            >
              <img src={noteIcon} alt="note icon" className="h-8 w-auto" />
            </a>
          </div>
        </div>

        <div className="py-6 font-eurostile">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Kizuki Aiki" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Message content..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center gap-4">
                <Button type="submit" className="mx-16 bg-[#252525] transition-scale hover:scale-105 hover:bg-[#252525]">
                  SEND A MESSAGE
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
