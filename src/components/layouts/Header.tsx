import React, { useState } from 'react';
import { FaXTwitter, FaGithub } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import titleImage from '~/assets/kz_creation.svg?url';
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

type Page = 'home' | 'profile' | 'activity' | 'notes';

interface HeaderProps {
  onPageChange: (page: Page) => void;
  currentPage: Page;
}

const contactFormSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  message: z.string().min(1, 'メッセージを入力してください'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Header: React.FC<HeaderProps> = ({ onPageChange, currentPage }) => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
    e.preventDefault();
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  const onSubmit = (data: ContactFormValues) => {
    console.log('Contact form submitted:', data);
    // ここでフォーム送信処理を実装
    // 例: APIへのPOSTリクエストなど
    alert('お問い合わせありがとうございます！');
    form.reset();
    setIsContactDialogOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 w-full h-24 flex items-center justify-between px-8 z-20">
        <div className="flex items-center">
          <a href="#" onClick={(e) => handleLinkClick(e, 'home')}>
            <img src={titleImage} alt="title image" className="h-10" />
          </a>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center text-[#FCFCFC] font-eurostile font-regular text-xl gap-12">
          <a href="#" onClick={(e) => handleLinkClick(e, 'profile')}>Profile</a>
          <a href="#" onClick={(e) => handleLinkClick(e, 'activity')}>Activity</a>
          <a href="#" onClick={(e) => handleLinkClick(e, 'notes')}>Notes</a>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => setIsContactDialogOpen(true)}
            className="text-[#FCFCFC] font-eurostile font-regular text-xl">
            Contact Me!
          </button>
        </div>
      </header>

      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#101010] main-fg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center font-eurostile">Contact Me</DialogTitle>
          </DialogHeader>

          {/* SNS Links Section */}
          <div className="flex flex-col items-center gap-4 py-6 border-b">
            <div className="flex items-center justify-center gap-6">
              <a 
                href="https://twitter.com/kz25_kmc/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <FaXTwitter className="text-3xl" />
              </a>
              <a 
                href="https://github.com/tarabakz25/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <FaGithub className="text-3xl" />
              </a>
              <a 
                href="https://note.com/kz25_01"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <img src={noteIcon} alt="note icon" className="h-8 w-auto" />
              </a>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="py-6 font-eurostile">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <Button type="submit" className="mx-16 bg-[#252525] hover:bg-[#252525] transition-scale hover:scale-105">
                    SEND A MESSAGE
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Header;
