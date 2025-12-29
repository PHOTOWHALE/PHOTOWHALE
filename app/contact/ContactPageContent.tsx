'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import { GA_CTA_EVENTS } from '@/constants/ga';

export default function ContactPageContent() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm('service_3qlulvc', 'template_ohtjm3g', form.current!, {
        publicKey: '3L-BnQVXLmhUVVHVw',
      })
      .then(
        () => {
          console.log('성공!');
          sendGAEvent(GA_CTA_EVENTS.submitContactSuccess);
          form.current?.reset();
        },
        (error: { text: string }) => {
          console.log('실패...', error.text);
          sendGAEvent(GA_CTA_EVENTS.submitContactFail);
        },
      );
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <p className="text-2xl font-bold pb-10">Contact Us</p>
      <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4 w-[70%]">
        <Input type="email" name="email" placeholder="이메일을 입력해주세요." />
        <TextArea name="message" placeholder="내용을 입력해주세요." required rows={8} />
        <Button
          onClick={() => sendGAEvent(GA_CTA_EVENTS.clickContactSubmit)}
          type="submit"
          variant="primary"
          className="w-31 mx-auto"
        >
          문의하기
        </Button>
      </form>
    </div>
  );
}
