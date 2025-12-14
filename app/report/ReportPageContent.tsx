'use client';

import Button from '@/components/common/Button';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';

export default function ReportPageContent() {
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
          form.current?.reset();
        },
        error => {
          console.log('실패...', error.text);
        },
      );
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <p className="text-xl font-bold">개선 사항 및 버그 내용을 적어주세요.</p>
      <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요."
          className="border rounded-xl p-4"
        />
        <textarea
          name="message"
          placeholder="내용을 입력해주세요."
          required
          rows={8}
          maxLength={500}
          className="border rounded-xl p-4"
        />
        <Button type="submit" variant="primary">
          문의하기
        </Button>
      </form>
    </div>
  );
}
