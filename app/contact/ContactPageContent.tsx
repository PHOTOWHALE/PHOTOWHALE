'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import { GA_CTA_EVENTS } from '@/constants/ga';
import { Toast } from '@/components/common/Toast';

export default function ContactPageContent() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendGAEvent('event', GA_CTA_EVENTS.clickContactSubmit, {
      page: 'contact',
    });

    emailjs
      .sendForm('service_3qlulvc', 'template_ohtjm3g', form.current!, {
        publicKey: '3L-BnQVXLmhUVVHVw',
      })
      .then(
        () => {
          Toast.success('문의가 성공적으로 전송되었어요! 🐳');

          sendGAEvent('event', GA_CTA_EVENTS.submitContactSuccess, {
            page: 'contact',
          });

          form.current?.reset();
        },
        (error: { text: string }) => {
          sendGAEvent('event', GA_CTA_EVENTS.submitContactFail, {
            page: 'contact',
            error_message: error.text,
          });

          Toast.error('문의 전송에 실패했어요. 🐳');
        },
      );
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <p className="text-2xl font-bold pb-10">Contact Us</p>

      <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4 w-[70%]">
        <Input type="email" name="email" placeholder="이메일을 입력해주세요." />
        <TextArea name="message" placeholder="내용을 입력해주세요." required rows={8} />
        <Button type="submit" variant="primary" className="w-31 mx-auto">
          문의하기
        </Button>
      </form>
    </div>
  );
}
