import Link from 'next/link';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/outline';

export default function ContactPageContent() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center py-10">
      <h1 className="text-3xl font-bold">Time Film</h1>

      <div className="flex flex-wrap gap-6 justify-center max-w-4xl">
        <div className="flex flex-col gap-4 p-6 border rounded-xl shadow-lg w-80 bg-white">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold">이윤환</h2>

              <div className="flex items-center">
                <UserIcon className="h-4 w-4 inline-block mr-1 text-gray-600" />
                <p className="text-sm text-gray-600">Frontend Developer</p>
              </div>

              <div className="flex items-center">
                <EnvelopeIcon className="h-4 w-4 inline-block mr-1 text-gray-600" />
                <p className="text-sm text-gray-600">cyzhqly@gmail.com</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-700"></p>
          <div className="flex gap-3">
            <Link
              href="https://github.com/unanbb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              GitHub
            </Link>
            <Link
              href="https://velog.io/@unanakadev/posts"
              className="text-blue-500 hover:underline text-sm"
            >
              Blog
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-6 border rounded-xl shadow-lg w-80 bg-white">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold">손성오</h2>

              <div className="flex items-center">
                <UserIcon className="h-4 w-4 inline-block mr-1 text-gray-600" />
                <p className="text-sm text-gray-600">Frontend Developer</p>
              </div>

              <div className="flex items-center">
                <EnvelopeIcon className="h-4 w-4 inline-block mr-1 text-gray-600" />
                <p className="text-sm text-gray-600">thstjddh8891@gmail.com</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-700"></p>
          <div className="flex gap-3">
            <Link
              href="https://github.com/Sonseongoh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              GitHub
            </Link>
            <Link
              href="https://velog.io/@sonson/posts"
              className="text-blue-500 hover:underline text-sm"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6 border rounded-xl shadow-lg max-w-2xl w-full bg-white">
        <h2 className="text-xl font-bold">Project Links</h2>
        <div className="flex flex-col gap-3">
          <Link
            href="https://github.com/Time-Film/Time-Film"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-500 hover:underline"
          >
            <span className="font-medium">GitHub Repository</span>
            <span className="text-sm text-gray-500">→</span>
          </Link>

          <Link href="/report" className="flex items-center gap-2 text-blue-500 hover:underline">
            <span className="font-medium">Contact Us</span>
            <span className="text-sm text-gray-500">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
